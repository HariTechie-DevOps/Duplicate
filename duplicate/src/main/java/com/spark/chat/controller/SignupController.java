package com.spark.chat.controller;

import com.spark.chat.dto.SignupRequest;
import com.spark.chat.dto.SignupResponse;
import com.spark.chat.entity.LanguagePreference;
import com.spark.chat.repository.LanguageRepository;
import com.spark.chat.services.SignupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SignupController {

    private final SignupService service;

    @Autowired
    private LanguageRepository langRepo;

    public SignupController(SignupService service) {
        this.service = service;
    }

    /**
     * SPA ROUTING FIX
     * If a user refreshes the page on /signin or /signup, Spring Boot 
     * usually throws a 404. This forwards those requests to React's index.html.
     */
    @GetMapping(value = {"/signin", "/signup", "/send-otp", "/reset-password", "/choose-language"})
    public ModelAndView redirectToIndex() {
        return new ModelAndView("forward:/index.html");
    }

    /**
     * 1. GET ALL LANGUAGES
     */
    @GetMapping("/api/languages")
    public List<String> getSupportedLanguages() {
        List<LanguagePreference> allPrefs = langRepo.findAll();
        if (allPrefs.isEmpty()) {
            // Default fallbacks for the Cinematic Landing bubbles
            return Arrays.asList("English", "Japanese", "Spanish", "French", "German", "Hindi", "Tamil");
        }
        return allPrefs.stream()
                .map(LanguagePreference::getLanguage)
                .filter(Objects::nonNull)
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

        LanguagePreference pref = langRepo.findByMobile(mobile)
                .orElse(new LanguagePreference());
        
        pref.setMobile(mobile);
        pref.setLanguage(language);
        langRepo.save(pref);

        return new SignupResponse(true, null, "Language saved successfully");
    }

    // Real-world example: Submitting the login form to the Java Backend
    async function submitLogin() {
        const userData = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        const response = await fetch('http://localhost:8080/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();
        if(result.message === "Success") {
            window.location.href = "chooseyourlanguage.html";
        }
    }
}

