package com.d209.childmade;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class ChildMadeApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChildMadeApplication.class, args);
	}

}
