package com.spark.chat.dto;
import lombok.Data;

@Data
public class SignupRequest {
    private String name;
    private int age;
    private String gender;
    private String mobile;
    private String password;
}

