package com.varabc.member.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.FileWriter;
import java.io.IOException;

@RestController
@RequestMapping("/")
public class MemberController {

    MemberController() { }

    @GetMapping("/")
    public ResponseEntity<?> test() {

        WebClient webClient = WebClient.create("https://varabc.s3.ap-northeast-2.amazonaws.com");

        Mono<String> result = webClient.get()
                .uri("/problem1_input_1.txt")
                .retrieve()
                .bodyToMono(String.class);

        String response = result.block();

        // 파일에 쓰기
        try {
            FileWriter writer = new FileWriter("input.txt");
            writer.write(response);
            writer.close();
        } catch (IOException e) {
            System.out.println("An error occurred while writing to file: " + e.getMessage());
        }

        System.out.println("Response written to output.txt");

        System.out.println("hello");

        return null;
    }

}
