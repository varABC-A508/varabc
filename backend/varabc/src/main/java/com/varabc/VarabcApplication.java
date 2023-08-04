package com.varabc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.varabc")
@EnableJpaRepositories(basePackages = "com.varabc")
public class VarabcApplication {

	public static void main(String[] args) {
		SpringApplication.run(VarabcApplication.class, args);
	}

}
