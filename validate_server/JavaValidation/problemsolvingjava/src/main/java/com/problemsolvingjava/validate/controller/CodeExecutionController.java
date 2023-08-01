package com.problemsolvingjava.validate.controller;

import com.problemsolvingjava.validate.domain.dto.ValidateDto;
import com.problemsolvingjava.validate.domain.dto.ValidationResultDto;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.*;

@RestController
public class CodeExecutionController {

    @PostMapping("/validate")
    public ResponseEntity<ValidationResultDto> executeCode(@RequestBody ValidateDto validateDto)
            throws IOException, InterruptedException {

        ValidationResultDto validationResultDto = new ValidationResultDto();

//        System.out.println(validateDto);

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
            System.out.println("error");
            validationResultDto.setResult("Compile error!");
            return new ResponseEntity<>(validationResultDto, HttpStatus.OK);
        }

        System.out.println("Compilation successful");

        // 3. 각각의 테케로 실행하기
        long maxElapsedTime = 0;

        for (int i = 0; i < validateDto.getInputFiles().size(); i++) {
            String inputData = validateDto.getInputFiles().get(i).getContent();
            String expectedOutputData = validateDto.getOutputFiles().get(i).getContent();

            System.out.println(inputData);
            System.out.println(expectedOutputData);

            //output설정하기
            File outputFile = new File("output.txt");
            //메모리제한
            ProcessBuilder runProcessBuilder = new ProcessBuilder("java", "-Xmx512m", "Main")
                    .redirectInput(ProcessBuilder.Redirect.PIPE)
                    .redirectOutput(outputFile)
                    .directory(new File(filename).getParentFile());

            //프로세스 실행
            long startTime = System.nanoTime();
            Process runProcess = runProcessBuilder.start();

            // PID를 얻습니다.
            long pid = runProcess.pid();

            // 메모리 사용량을 주기적으로 확인하는 스레드를 시작합니다.
            String os = System.getProperty("os.name").toLowerCase();
            if (os.contains("win")) {
                //윈도우용 코드
                Thread memoryMonitor = new Thread(() -> {
                    long maxMemoryUsage = 0;
                    try {
                        while (runProcess.isAlive()) {
                            ProcessBuilder processBuilder = new ProcessBuilder("cmd.exe", "/c", "tasklist /FI \"PID eq " + pid + "\" /FO CSV /NH");
                            Process memoryProcess = processBuilder.start();
                            try (BufferedReader reader = new BufferedReader(new InputStreamReader(memoryProcess.getInputStream()))) {
                                String line;
                                while ((line = reader.readLine()) != null) {
                                    String[] split = line.split(",");
                                    if (split.length > 4) {
                                        // 메모리 사용량은 5번째 열에 있습니다.
                                        // 그것을 파싱하고 킬로바이트 단위로 출력합니다.
                                        long memoryUsage = Long.parseLong(split[4].replaceAll("\"", "").replaceAll(",", "").trim());
                                        maxMemoryUsage = Math.max(maxMemoryUsage, memoryUsage);
                                    }
                                }
                            }
                            // 매 0.1초마다 메모리 사용량을 확인합니다.
                            Thread.sleep(100);
                        }
                    } catch (InterruptedException | IOException e) {
                        e.printStackTrace();
                    }
                    System.out.println("Maximum memory usage: " + maxMemoryUsage + "KB");
                });
                memoryMonitor.start();
            } else {
                //리눅스용 코드
                Thread memoryMonitor = new Thread(() -> {
                    long maxMemoryUsage = 0;
                    try {
                        while (runProcess.isAlive()) {
                            ProcessBuilder processBuilder = new ProcessBuilder("bash", "-c", "ps -p " + pid + " -o rss");
                            Process memoryProcess = processBuilder.start();
                            try (BufferedReader reader = new BufferedReader(new InputStreamReader(memoryProcess.getInputStream()))) {
                                String line;
                                while ((line = reader.readLine()) != null) {
                                    // 첫 번째 줄은 헤더이므로 건너뛰기
                                    if (line.trim().startsWith("RSS")) {
                                        continue;
                                    }
                                    // 메모리 사용량은 킬로바이트 단위로 출력됩니다.
                                    long memoryUsage = Long.parseLong(line.trim());
                                    maxMemoryUsage = Math.max(maxMemoryUsage, memoryUsage);
                                }
                            }
                            // 매 0.1초마다 메모리 사용량을 확인합니다.
                            Thread.sleep(100);
                        }
                    } catch (InterruptedException | IOException e) {
                        e.printStackTrace();
                    }
                    System.out.println("Maximum memory usage: " + maxMemoryUsage + "KB");
                });
                memoryMonitor.start();
            }

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

            try {
                future.get(2, TimeUnit.SECONDS); // If the task takes more than 2 seconds, a TimeoutException will be thrown
            } catch (TimeoutException e) {
                future.cancel(true); // In case it is still running, interrupt the thread
                if (runProcess.isAlive()) {
                    runProcess.destroyForcibly(); // Terminate the process forcibly.
                }
                System.out.println("timeout");
                validationResultDto.setResult("Timeout error!");
                return new ResponseEntity<>(validationResultDto, HttpStatus.OK);
            } catch (InterruptedException | ExecutionException e) {
                System.out.println("other error");
                validationResultDto.setResult("Execution error!");
                return new ResponseEntity<>(validationResultDto, HttpStatus.OK);
            }

            // 예상 결과랑 결과 비교하기->toString으로 비교하면 오버헤드가 너무 커짐
            String output = new String(Files.readAllBytes(outputFile.toPath()), "UTF-8");
            output = output.replaceAll("\r", "");
            System.out.println("output : " + output);
            if (!output.trim().equals(expectedOutputData)) {
                System.out.println("Test failed");
                validationResultDto.setResult("Test failed!");
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

        validationResultDto.setResult("All tests passed!");
        validationResultDto.setExecutionTime(maxElapsedTime / 1_000_000);

        return new ResponseEntity<>(validationResultDto, HttpStatus.OK);
    }
}