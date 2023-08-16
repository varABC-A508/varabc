package com.problemsolvingjava.validate.controller;

import com.problemsolvingjava.validate.domain.dto.CompileResultDto;
import com.problemsolvingjava.validate.domain.dto.ValidateDto;
import com.problemsolvingjava.validate.domain.dto.ValidationResultDto;
import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;
import java.lang.management.MemoryUsage;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.*;

@RestController
public class CodeExecutionController {


    @PostMapping("/compile")
    public ResponseEntity<CompileResultDto> complieCode(@RequestBody ValidateDto validateDto)
            throws IOException, InterruptedException {

        CompileResultDto compileResultDto = new CompileResultDto();
        compileResultDto.setProblemNo(validateDto.getProblemNo());

        // 파일이름 정하고 파일에 읽기, 덮어쓰는 방식으로 하자
        String filename = "Main.java";
        //컴파일러 인코더 설정, 근데 저장되는 한글 주석은 여전히 깨짐
        System.setProperty("file.encoding", "UTF-8");
        BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(filename), "UTF-8"));
        writer.write(validateDto.getCode());
        writer.close();

        // 2. 코드 컴파일, 프로세스 빌더
        ProcessBuilder compileProcessBuilder = new ProcessBuilder("javac", "-encoding", "UTF-8", filename);
        Process compileProcess = compileProcessBuilder.start();

        int compileResult = compileProcess.waitFor();
        if (compileResult != 0) {
            System.out.println("compile error");
            compileResultDto.setResult(4);
            compileResultDto.setExceptionMessage("compile error");
            return new ResponseEntity<>(compileResultDto, HttpStatus.OK);
        }

        System.out.println("Compilation successful");

        // 3. 각각의 테케로 실행하기
        long maxElapsedTime = 0;
        AtomicLong maxMemoryUsed = new AtomicLong();

        List<String> outputList = new ArrayList<>();

        for (int i = 0; i < validateDto.getInputFiles().size(); i++) {
            String inputData = validateDto.getInputFiles().get(i).getContent();
            String expectedOutputData = validateDto.getOutputFiles().get(i).getContent();

//            System.out.println(inputData);
            System.out.println(expectedOutputData);

            //output설정하기
            File outputFile = new File("output.txt");
            int dividedMemoryLimit = validateDto.getMemoryLimit() / 1_000_000;
            //메모리제한
            ProcessBuilder runProcessBuilder = new ProcessBuilder("java", "-Xmx" + dividedMemoryLimit + "m", "Main")
                    .redirectInput(ProcessBuilder.Redirect.PIPE)
                    .redirectOutput(outputFile)
                    .directory(new File(filename).getParentFile());

            //프로세스 실행
            long startTime = System.nanoTime();
            Process runProcess = runProcessBuilder.start();

            // 메모리 측정할 객체
            MemoryMXBean memoryMXBean = ManagementFactory.getMemoryMXBean();

            // 메모리 측정 쓰레드
            Thread memoryMonitor = new Thread(() -> {
                try {
                    while (runProcess.isAlive()) {
                        MemoryUsage heapMemoryUsage = memoryMXBean.getHeapMemoryUsage();
                        MemoryUsage nonHeapMemoryUsage = memoryMXBean.getNonHeapMemoryUsage();

//                        System.out.println(heapMemoryUsage.toString());
//                        System.out.println(nonHeapMemoryUsage.toString());

                        // 최대 사용 메모리를 저장해두기
                        maxMemoryUsed.set(Math.max(maxMemoryUsed.get(),
                                heapMemoryUsage.getUsed() + nonHeapMemoryUsage.getUsed()));

                        // 매 100밀리초마다 메모리 사용량을 확인합니다.
                        Thread.sleep(100);
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            });
            memoryMonitor.start();

            //input 입력해주기
            BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(runProcess.getOutputStream()));
            bufferedWriter.write(inputData);
            bufferedWriter.close();

            Future<Boolean> future = Executors.newSingleThreadExecutor().submit(() -> {
                while(runProcess.isAlive()) {
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        runProcess.destroy();
                        return false;
                    }
                }
                return true;
            });

            boolean next = false;
            // 메모리초과가 발생했었는지 검사하기
            BufferedReader reader = new BufferedReader(new InputStreamReader(runProcess.getErrorStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.contains("OutOfMemoryError")) {
                    // OOM 발생 감지
                    System.out.println("memory out");
//                    compileResultDto.setResult(3);
//                    compileResultDto.setExceptionMessage("memory out");
//                    return new ResponseEntity<>(compileResultDto, HttpStatus.OK);

                    outputList.add("memory out");
                    next = true;
                    break;
                }
            }

            if (next) {
                continue;
            }

            try {
                // 시간제한이 실수일 수 있으므로 올림 해서 정수로 만든다
                future.get((long) Math.ceil(validateDto.getTimeLimit()), TimeUnit.SECONDS); // If the task takes more than 2 seconds, a TimeoutException will be thrown
            } catch (TimeoutException e) {
                future.cancel(true); // In case it is still running, interrupt the thread
                if (runProcess.isAlive()) {
                    runProcess.destroyForcibly(); // Terminate the process forcibly.
                }
                System.out.println("timeout");
//                compileResultDto.setResult(2);
//                compileResultDto.setExceptionMessage("time out");
//                return new ResponseEntity<>(compileResultDto, HttpStatus.OK);

                outputList.add("timeout");
                continue;

            } catch (InterruptedException | ExecutionException e) {
                System.out.println("other error");
//                compileResultDto.setResult(4);
//                compileResultDto.setExceptionMessage("other error");
//                return new ResponseEntity<>(compileResultDto, HttpStatus.OK);

                outputList.add("Exception");
                continue;
            }

            // 예상 결과랑 결과 비교하기->toString으로 비교하면 오버헤드가 너무 커짐
            String output = new String(Files.readAllBytes(outputFile.toPath()), "UTF-8");
            output = output.replaceAll("\r", "");
            System.out.println("output : " + output);
            outputList.add(output);
//            if (!output.trim().equals(expectedOutputData.trim())) {
//                System.out.println("Test failed");
//                compileResultDto.setResult(4);
//                return new ResponseEntity<>(compileResultDto, HttpStatus.OK);
//            }

            long endTime = System.nanoTime();
            long elapsedTime = endTime - startTime;
            maxElapsedTime = Math.max(maxElapsedTime, elapsedTime);

            // 반올림해서 못잡은 시간초과도 체크하기
            if (validateDto.getTimeLimit() < maxElapsedTime / 1_000_000_000) {
                System.out.println("timeout");
//                compileResultDto.setResult(2);
//                return new ResponseEntity<>(compileResultDto, HttpStatus.OK);

                outputList.add("timeout");
                continue;
            }

            System.out.println(elapsedTime/ 1_000_000);
            System.out.println("Test passed");
        }

        //다쓰면 지워버리기~
        Files.deleteIfExists(Paths.get(filename));
        Files.deleteIfExists(Paths.get(filename.substring(0, filename.lastIndexOf('.')) + ".class"));
        System.out.println(maxElapsedTime);

        compileResultDto.setResult(1);
        compileResultDto.setExecutionTime((int)(maxElapsedTime / 1_000_000));
        compileResultDto.setMemoryUsage((int) (maxMemoryUsed.get()/1024));
        compileResultDto.setOutput(outputList);
        return new ResponseEntity<>(compileResultDto, HttpStatus.OK);
    }


    @PostMapping("/evaluate")
    public ResponseEntity<ValidationResultDto> executeCode(@RequestBody ValidateDto validateDto)
            throws IOException, InterruptedException {

        ValidationResultDto validationResultDto = new ValidationResultDto();
        validationResultDto.setProblemNo(validateDto.getProblemNo());

        // 파일이름 정하고 파일에 읽기, 덮어쓰는 방식으로 하자
        String filename = "Main.java";
        //컴파일러 인코더 설정, 근데 저장되는 한글 주석은 여전히 깨짐
        System.setProperty("file.encoding", "UTF-8");
        BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(filename), "UTF-8"));
        writer.write(validateDto.getCode());
        writer.close();

        // 2. 코드 컴파일, 프로세스 빌더
        ProcessBuilder compileProcessBuilder = new ProcessBuilder("javac", "-encoding", "UTF-8", filename);
        Process compileProcess = compileProcessBuilder.start();

        int compileResult = compileProcess.waitFor();
        if (compileResult != 0) {
            System.out.println("compile error");
            validationResultDto.setResult(4);
            validationResultDto.setExceptionMessage("compile error");
            return new ResponseEntity<>(validationResultDto, HttpStatus.OK);
        }

        System.out.println("Compilation successful");

        // 3. 각각의 테케로 실행하기
        long maxElapsedTime = 0;
        AtomicLong maxMemoryUsed = new AtomicLong();

        for (int i = 0; i < validateDto.getInputFiles().size(); i++) {
            String inputData = validateDto.getInputFiles().get(i).getContent();
            String expectedOutputData = validateDto.getOutputFiles().get(i).getContent();

//            System.out.println(inputData);
            System.out.println(expectedOutputData);

            //output설정하기
            File outputFile = new File("output.txt");
            int dividedMemoryLimit = validateDto.getMemoryLimit() / 1_000_000;
            //메모리제한
            ProcessBuilder runProcessBuilder = new ProcessBuilder("java", "-Xmx" + dividedMemoryLimit + "m", "Main")
                    .redirectInput(ProcessBuilder.Redirect.PIPE)
                    .redirectOutput(outputFile)
                    .directory(new File(filename).getParentFile());

            //프로세스 실행
            long startTime = System.nanoTime();
            Process runProcess = runProcessBuilder.start();

            // 메모리 측정할 객체
            MemoryMXBean memoryMXBean = ManagementFactory.getMemoryMXBean();

            // 메모리 측정 쓰레드
            Thread memoryMonitor = new Thread(() -> {
                try {
                    while (runProcess.isAlive()) {
                        MemoryUsage heapMemoryUsage = memoryMXBean.getHeapMemoryUsage();
                        MemoryUsage nonHeapMemoryUsage = memoryMXBean.getNonHeapMemoryUsage();

//                        System.out.println(heapMemoryUsage.toString());
//                        System.out.println(nonHeapMemoryUsage.toString());

                        // 최대 사용 메모리를 저장해두기
                        maxMemoryUsed.set(Math.max(maxMemoryUsed.get(),
                                heapMemoryUsage.getUsed() + nonHeapMemoryUsage.getUsed()));

                        // 매 100밀리초마다 메모리 사용량을 확인합니다.
                        Thread.sleep(100);
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            });
            memoryMonitor.start();

            //input 입력해주기
            BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(runProcess.getOutputStream()));
            bufferedWriter.write(inputData);
            bufferedWriter.close();

            Future<Boolean> future = Executors.newSingleThreadExecutor().submit(() -> {
                while(runProcess.isAlive()) {
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        runProcess.destroy();
                        return false;
                    }
                }
                return true;
            });

            // 메모리초과가 발생했었는지 검사하기
            BufferedReader reader = new BufferedReader(new InputStreamReader(runProcess.getErrorStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.contains("OutOfMemoryError")) {
                    // OOM 발생 감지
                    System.out.println("memory out");
                    validationResultDto.setResult(3);
                    validationResultDto.setExceptionMessage("memory out");
                    return new ResponseEntity<>(validationResultDto, HttpStatus.OK);
                }
            }

            try {
                // 시간제한이 실수일 수 있으므로 올림 해서 정수로 만든다
                future.get((long) Math.ceil(validateDto.getTimeLimit()), TimeUnit.SECONDS); // If the task takes more than 2 seconds, a TimeoutException will be thrown
            } catch (TimeoutException e) {
                future.cancel(true); // In case it is still running, interrupt the thread
                if (runProcess.isAlive()) {
                    runProcess.destroyForcibly(); // Terminate the process forcibly.
                }
                System.out.println("timeout");
                validationResultDto.setResult(2);
                validationResultDto.setExceptionMessage("time out");
                return new ResponseEntity<>(validationResultDto, HttpStatus.OK);
            } catch (InterruptedException | ExecutionException e) {
                System.out.println("other error");
                validationResultDto.setResult(4);
                validationResultDto.setExceptionMessage("other error");
                return new ResponseEntity<>(validationResultDto, HttpStatus.OK);
            }

            // 예상 결과랑 결과 비교하기->toString으로 비교하면 오버헤드가 너무 커짐
            String output = new String(Files.readAllBytes(outputFile.toPath()), "UTF-8");
            output = output.replaceAll("\r", "");
            System.out.println("output : " + output);
            if (!output.trim().equals(expectedOutputData.trim())) {
                System.out.println("Test failed");
                validationResultDto.setResult(4);
                return new ResponseEntity<>(validationResultDto, HttpStatus.OK);
            }

            long endTime = System.nanoTime();
            long elapsedTime = endTime - startTime;
            maxElapsedTime = Math.max(maxElapsedTime, elapsedTime);
            System.out.println(elapsedTime/ 1_000_000);
            System.out.println("Test passed");
        }

        //다쓰면 지워버리기~
        Files.deleteIfExists(Paths.get(filename));
        Files.deleteIfExists(Paths.get(filename.substring(0, filename.lastIndexOf('.')) + ".class"));
        System.out.println(maxElapsedTime);

        // 반올림해서 못잡은 시간초과도 체크하기
        if (validateDto.getTimeLimit() < maxElapsedTime / 1_000_000_000) {
            validationResultDto.setResult(2);
            return new ResponseEntity<>(validationResultDto, HttpStatus.OK);
        }

        validationResultDto.setResult(1);
        validationResultDto.setExecutionTime((int)(maxElapsedTime / 1_000_000));
        validationResultDto.setMemoryUsage((int) (maxMemoryUsed.get()/1024));
        return new ResponseEntity<>(validationResultDto, HttpStatus.OK);
    }
}