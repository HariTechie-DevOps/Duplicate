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
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
@RequestMapping("/api")
public class SignupController {

    private final SignupService service;

    @Autowired
    private LanguageRepository langRepo;

    public SignupController(SignupService service) {
        this.service = service;
    }

    /**
     * SPA ROUTING FIX
     * Since this handles the browser's URL navigation, we use the full path.
     */
    @GetMapping(value = {"/signin", "/signup", "/send-otp", "/reset-password", "/choose-language"})
    public ModelAndView redirectToIndex() {
        return new ModelAndView("forward:/index.html");
    }

    /**
     * 1. GET ALL LANGUAGES
     * Access: GET http://localhost:8080/api/languages
     */
    @GetMapping("/languages")
    public List<String> getSupportedLanguages() {
        List<LanguagePreference> allPrefs = langRepo.findAll();
        if (allPrefs.isEmpty()) {
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
     * Access: POST http://localhost:8080/api/signup
     */
    @PostMapping("/signup")
    public SignupResponse signup(@RequestBody SignupRequest request) {
        return service.handlesignup(request);
    }

    @PostMapping("/signin")
    public SignupResponse signin(@RequestBody SignupRequest request) {
        return service.handleSignin(request); 
    }
    
    /**
     * 3. OTP & PASSWORD MANAGEMENT
     */
    @PostMapping("/password/send-otp")
    public SignupResponse sendOtp(@RequestBody Map<String, String> payload) {
        return service.sendOtp(payload.get("mobile"));
    }

    @PostMapping("/password/verify-otp")
    public SignupResponse verifyOtp(@RequestBody Map<String, String> payload) {
        return service.verifyOtp(payload.get("mobile"), payload.get("otp"));
    }

    @PostMapping("/password/reset")
    public SignupResponse resetPassword(@RequestBody Map<String, String> payload) {
        return service.updatePassword(payload.get("mobile"), payload.get("password"));
    }

    /**
     * 4. USER PREFERENCES
     */
    @PostMapping("/save-language")
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
}
