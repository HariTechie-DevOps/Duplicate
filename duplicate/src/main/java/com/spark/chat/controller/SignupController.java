package com.spark.chat.controller;

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
    
}



