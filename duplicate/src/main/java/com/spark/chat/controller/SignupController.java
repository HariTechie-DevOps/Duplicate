package com.spark.chat.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import com.spark.chat.repository.LanguageRepository;
import org.springframework.web.bind.annotation.*; 
import java.util.Map;
import com.spark.chat.dto.SignupRequest;
import com.spark.chat.dto.SignupResponse;
import com.spark.chat.services.SignupService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SignupController {

    private final SignupService service;

     @Autowired
    private LanguageRepository langRepo;

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

   @PostMapping("/api/password/forgot")
    public SignupResponse forgotPassword(@RequestBody Map<String, String> payload) {
        // This looks for {"mobile": "9345..."} in the request body
        return service.sendOtp(payload.get("mobile"));
    }

    @PostMapping("/api/password/reset")
    public SignupResponse resetPassword(@RequestBody Map<String, String> payload) {
        String mobile = payload.get("mobile");
        String newPassword = payload.get("password");
        // This ensures only the user with this specific mobile is updated
        return service.updatePassword(mobile, newPassword);
    }

    @GetMapping("/api/login-with-token")
    public SignupResponse loginWithToken(@RequestParam String token) {
        return service.loginWithToken(token);
    }

    @PostMapping("/api/save-language")
    public SignupResponse saveLanguage(@RequestBody Map<String, String> request) {
        String mobile = request.get("mobile");
        String language = request.get("language");

        // Real-world logic: Check if preference exists, if so update it, else create new
        LanguagePreference pref = langRepo.findByMobile(mobile)
            .orElse(new LanguagePreference(mobile, language));
    
        pref.setLanguage(language);
        langRepo.save(pref);

        return new SignupResponse(true, null, "Language saved successfully");
    }
}














