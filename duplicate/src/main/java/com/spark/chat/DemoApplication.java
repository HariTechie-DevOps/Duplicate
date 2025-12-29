package com.spark.chat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        // This starts the embedded Tomcat server on port 8080
        SpringApplication.run(DemoApplication.class, args);
        System.out.println("Backend is running! You can now open your HTML files.");
    }
}
