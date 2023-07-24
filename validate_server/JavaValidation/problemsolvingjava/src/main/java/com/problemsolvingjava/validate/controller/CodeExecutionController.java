package com.problemsolvingjava.validate.controller;

import com.problemsolvingjava.validate.domain.dto.SubmitDto;
import com.problemsolvingjava.validate.domain.dto.TestCaseDto;
import org.springframework.web.bind.annotation.*;
import java.io.*;

@RestController
public class CodeExecutionController {

    @PostMapping("/validate")
    public String executeCode(@RequestBody SubmitDto submitDto)
            throws IOException, InterruptedException {
        System.out.println(submitDto.getCode());
        // 1. 코드를 .java 파일로 저장하기
        String filename = "Main.java";
        FileWriter writer = new FileWriter(filename);
        writer.write(submitDto.getCode());
        writer.close();

        // 2. 코드 컴파일하기
        Process compileProcess = Runtime.getRuntime().exec("javac " + filename);
        try {
            int compileResult = compileProcess.waitFor();
            if (compileResult != 0) {
                return "Compile error!";
            }
        } catch (InterruptedException e) {
            return "Compilation interrupted: " + e.getMessage();
        }

        System.out.println("컴파일 완료");

        System.out.println(submitDto.getTestCases());

        long time = 0;
        long memory = 0;

        Runtime runtime = Runtime.getRuntime();

        for (TestCaseDto testCaseDto : submitDto.getTestCases()) {
            // 초기 시간을 저장합니다.
            long startTime = System.nanoTime();
            // 초기 전체 메모리와 가용 메모리를 가져옵니다.
            long initialMemory = runtime.totalMemory() - runtime.freeMemory();

            // 3. 코드 실행하기
            System.out.println(testCaseDto.getInputData());
            Process runProcess = new ProcessBuilder("java", "Main")
                    .redirectInput(ProcessBuilder.Redirect.PIPE)
                    .redirectOutput(ProcessBuilder.Redirect.PIPE)
                    .start();

            // Provide input to the process
            runProcess.getOutputStream().write(testCaseDto.getInputData().getBytes());
            runProcess.getOutputStream().flush();
            runProcess.getOutputStream().close();

            BufferedReader reader = new BufferedReader(new InputStreamReader(runProcess.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }
            int runResult = runProcess.waitFor();

            // 코드 실행 후 시간을 저장합니다.
            long endTime = System.nanoTime();

            // 코드 실행 후 전체 메모리와 가용 메모리를 다시 측정합니다.
            long finalMemory = runtime.totalMemory() - runtime.freeMemory();

            // 코드 실행 시간을 측정합니다.
            long elapsedTime = endTime - startTime;

            // 코드가 실행되며 사용한 시간을 측정합니다.
            long usedMemory = finalMemory - initialMemory;

            if (runResult != 0) {
                return "Runtime error!";
            }

            // 4. 테스트 케이스 확인하기
            if (output.toString().trim().equals(testCaseDto.getExpectedData())) {
                System.out.println("Test passed!");
                time = Math.max(time, elapsedTime);
                memory = Math.max(memory, usedMemory);
            } else {
                return "Test failed!";
            }
        }

        return "All test cases passed! time : " + time / 1_000_000 + "ms, memory : " + memory / 1024 + "Kb";
    }
}
