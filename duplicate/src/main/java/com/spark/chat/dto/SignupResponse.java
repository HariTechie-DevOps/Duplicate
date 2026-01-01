package com.spark.chat.dto;
@Data
public class SignupResponse {
    private boolean success;
    private String message;
    private String field;
    private String token;

    // 1. Constructor for 3 arguments (Fixes your old code)
    public SignupResponse(boolean success, String field, String message) {
        this.success = success;
        this.field = field;
        this.message = message;
    }

    // 2. Constructor for 4 arguments (For your new Token logic)
    public SignupResponse(boolean success, String field, String message, String token) {
        this.success = success;
        this.field = field;
        this.message = message;
        this.token = token;
    }

    // 3. Default constructor for Jackson/JSON
    public SignupResponse() {}

    // Getters and Setters for all 4 fields...
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getField() { return field; }
    public void setField(String field) { this.field = field; }
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}
