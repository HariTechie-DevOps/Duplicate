package com.spark.chat.controller;

import com.spark.chat.dto.SignupRequest;
import com.spark.chat.dto.SignupResponse;
import com.spark.chat.entity.LanguagePreference; // Fixed package name from .entities to .entity
import com.spark.chat.repository.LanguageRepository;
import com.spark.chat.services.SignupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
// In production, change "*" to your actual domain. Using "*" is okay for development.
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SignupController {

    private final SignupService service;

    @Autowired
    private LanguageRepository langRepo;

    public SignupController(SignupService service) {
        this.service = service;
    }
    @GetMapping("/{path:[^\\.]*}")
    public String redirect() {
        // This ensures that if a user visits /signup or /signin, 
        // Spring Boot lets React handle it.
        return "forward:/index.html";
    }
    /**
     * 1. GET ALL LANGUAGES
     * This connects to your Figma "Language Badges".
     * It fetches real data from your LanguageRepository.
     */
    @GetMapping("/api/languages")
    public List<String> getSupportedLanguages() {
        // Real-world logic: Fetch from DB. If DB is empty, return defaults.
        List<LanguagePreference> allPrefs = langRepo.findAll();
        if (allPrefs.isEmpty()) {
            return Arrays.asList("English", "Japanese", "Spanish", "French", "German", "Hindi");
        }
        return allPrefs.stream()
                .map(LanguagePreference::getLanguage)
                .distinct()
                .collect(Collectors.toList());
    }

    /**
     * 2. SIGNUP & SIGNIN
     */
    @PostMapping("/api/signup")
    public SignupResponse signup(@RequestBody SignupRequest request) {
        return service.handlesignup(request);
    }

    @PostMapping("/api/signin")
    public SignupResponse signin(@RequestBody SignupRequest request) {
        return service.handleSignin(request); 
    }
    
    /**
     * 3. OTP & PASSWORD MANAGEMENT
     */
    @PostMapping("/api/password/send-otp")
    public SignupResponse sendOtp(@RequestBody Map<String, String> payload) {
        return service.sendOtp(payload.get("mobile"));
    }

    @PostMapping("/api/password/verify-otp")
    public SignupResponse verifyOtp(@RequestBody Map<String, String> payload) {
        return service.verifyOtp(payload.get("mobile"), payload.get("otp"));
    }

    @PostMapping("/api/password/reset")
    public SignupResponse resetPassword(@RequestBody Map<String, String> payload) {
        return service.updatePassword(payload.get("mobile"), payload.get("password"));
    }

    /**
     * 4. USER PREFERENCES
     */
    @PostMapping("/api/save-language")
    public SignupResponse saveLanguage(@RequestBody Map<String, String> request) {
        String mobile = request.get("mobile");
        String language = request.get("language");

        // Real-world: Find existing or create new preference
        LanguagePreference pref = langRepo.findByMobile(mobile)
                .orElse(new LanguagePreference());
        
        pref.setMobile(mobile);
        pref.setLanguage(language);
        langRepo.save(pref);

        return new SignupResponse(true, null, "Language saved successfully");
    }
}

