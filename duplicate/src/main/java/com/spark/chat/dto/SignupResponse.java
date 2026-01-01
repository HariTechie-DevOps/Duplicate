package com.spark.chat.dto;
import lombok.Data;

@Data
public class SignupResponse {
    private boolean success;
    private String field;
    private String message;
    private String token;

    public SignupResponse(boolean success,String field,String message,String token){
        this.success = success;
        this.field = field;
        this.message = message;
        this.token = token;
    }
   
}
