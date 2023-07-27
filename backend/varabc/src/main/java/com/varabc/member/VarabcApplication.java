package com.varabc.member;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.varabc")
@EnableJpaRepositories("com.varabc.problem.repository")
@EntityScan("com.varabc.problem.domain.entity")
public class VarabcApplication {

	public static void main(String[] args) {
		SpringApplication.run(VarabcApplication.class, args);
	}

}
