package com.varabc.member;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.varabc")
public class VarabcApplication {

	public static void main(String[] args) {
		SpringApplication.run(VarabcApplication.class, args);
	}

}
