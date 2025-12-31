package com.spark.chat.controller;

import java.util.Map;
import com.spark.chat.dto.SignupRequest;
import com.spark.chat.dto.SignupResponse;
import com.spark.chat.services.SignupService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SignupController {

    private final SignupService service;

    public SignupController(SignupService service){
        this.service = service;
    }
    
    @PostMapping("/api/signup")
    public SignupResponse signup(@RequestBody SignupRequest request) {
        return service.handlesignup(request);
    }
    
    // UPDATED CODE (Real/Connected)
    @PostMapping("/api/signin")
    public SignupResponse signin(@RequestBody SignupRequest request) {
        // This now tells the Service to check the database
        return service.handleSignin(request); 
    }

    @PostMapping("/api/password/send-otp")
    public SignupResponse sendOtp(@RequestBody Map<String, String> payload) {
        return service.sendOtp(payload.get("mobile"));
    }

    @PostMapping("/api/password/verify-otp")
    public SignupResponse verifyOtp(@RequestBody Map<String, String> payload) {
        // We need the mobile number to know which OTP to check
        return service.verifyOtp(payload.get("mobile"), payload.get("otp"));
    }
}





