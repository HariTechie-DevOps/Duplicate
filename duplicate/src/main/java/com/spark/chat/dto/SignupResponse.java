package com.spark.chat.dto;
import lombok.Data;
import lombok.NoArgsConstructor; // Add this
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor // Required for JSON tools
@AllArgsConstructor
public class SignupResponse {
    private boolean success;
    private String field;
    private String message;

   
}
