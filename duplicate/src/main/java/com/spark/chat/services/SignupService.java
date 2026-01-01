package com.spark.chat.services;

import com.spark.chat.entity.User;
import com.spark.chat.repository.SignupRepository;
import com.spark.chat.dto.SignupRequest;
import com.spark.chat.dto.SignupResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;
import java.net.URLEncoder;
import java.util.Scanner;


@Service
public class SignupService {

    private final String FAST2SMS_KEY = "273o16HgyGabwheWFQT4JtkRplVdLiIXB5j0YPxAmMON8zvUrSNZG2BSCTRU9uj0npIb4dy8Mq3Ycz5h"; 
    private final ConcurrentHashMap<String, String> otpStorage = new ConcurrentHashMap<>();

    private final SignupRepository repo;
    
    @Autowired
    private LanguageRepository langRepo; // Your new Repository

    public SignupService(SignupRepository repo){
        this.repo = repo;
    }

    public void saveUserLanguage(String mobile, String selectedLanguage) {
        // 1. Check if this user already has a language set
        LanguagePreference pref = langRepo.findByMobile(mobile)
            .orElse(new LanguagePreference());

        // 2. Set the data
        pref.setMobile(mobile); // The Link
        pref.setLanguage(selectedLanguage);

        // 3. Save to the second table
        langRepo.save(pref);
    }
    
    public SignupResponse handlesignup(SignupRequest request){
       
        if(repo.findByMobile(request.getMobile()).isPresent()){
            return new SignupResponse(false, "mobile", "Mobile number already registered");
        }
      
        User newUser = new User();
        newUser.setName(request.getName());
        newUser.setAge(request.getAge());
        newUser.setGender(request.getGender());
        newUser.setMobile(request.getMobile());
        newUser.setPassword(request.getPassword()); 
        
        repo.save(newUser);
        
        return new SignupResponse(true, null, "Signup successful");
    }

    public SignupResponse handleSignin(SignupRequest request) {
        return repo.findByMobile(request.getMobile())
            .map(user -> {
                if (user.getPassword().equals(request.getPassword())) {
                    return new SignupResponse(true, null, "Login Successful!");
                } else {
                    return new SignupResponse(false, "password", "Incorrect password");
                }
            })
            .orElse(new SignupResponse(false, "mobile", "User not found"));
    }

    public SignupResponse sendOtp(String mobile) {
        // 1. Generate the 6-digit code
        String otp = String.format("%06d", new Random().nextInt(999999));
    
        // 2. CRITICAL: You must save it in otpStorage so verifyOtp works!
        otpStorage.put(mobile, otp); 

        // 3. Print to terminal for you to see
        System.out.println("******************************************");
        System.out.println("DEVELOPER ALERT: OTP for " + mobile + " is [" + otp + "]");
        System.out.println("******************************************");

        return new SignupResponse(true, null, "OTP printed to server terminal!");
    }
    
    public SignupResponse verifyOtp(String mobile, String userOtp) {
        String savedOtp = otpStorage.get(mobile);
        if (savedOtp != null && savedOtp.equals(userOtp)) {
            otpStorage.remove(mobile); // Clear it after successful verification
            return new SignupResponse(true, null, "OTP Verified!");
        }
        return new SignupResponse(false, "otp", "Invalid OTP entered.");
    }
    @Transactional
    public SignupResponse updatePassword(String mobile, String newPassword) {
    // 1. Clean the mobile (removes the space between + and 91)
    String cleanMobile = mobile.replaceAll("\\s+", ""); 
    
    System.out.println("DEBUG: Searching for: [" + cleanMobile + "]");

    // 2. Call the new repository method
    return repo.findByMobileEndingWith(cleanMobile) 
        .map(user -> {
            user.setPassword(newPassword);
            repo.save(user);
            System.out.println("DEBUG: SUCCESS! Database updated.");
            return new SignupResponse(true, null, "Password changed successfully!");
        })
        .orElseGet(() -> {
            System.out.println("DEBUG: FAILED! User not found for: " + cleanMobile);
            return new SignupResponse(false, "mobile", "User not found");
        });
    }

    public SignupResponse login(String mobile, String password) {
        return repo.findByMobile(mobile)
            .map(user -> {
                if (user.getPassword().equals(password)) {
                    // 1. Generate a new unique token
                    String token = java.util.UUID.randomUUID().toString();
                
                    // 2. Set it in the user object
                    user.setToken(token);
                
                    // 3. IMPORTANT: Save the user back to the DB
                    repo.save(user); 
                
                    System.out.println("DEBUG: Token generated and saved for: " + mobile);
                
                    // 4. Return success with the token (4-argument constructor)
                    return new SignupResponse(true, null, user.getName(), token);
                } else {
                    return new SignupResponse(false, "password", "Invalid password");
                }
            })
            .orElse(new SignupResponse(false, "mobile", "User not found"));
        }

    // Add this new method for auto-login
    public SignupResponse loginWithToken(String token) {
        return repo.findByToken(token)
            .map(user -> new SignupResponse(true, null, user.getName(), token))
            .orElse(new SignupResponse(false, null, "Invalid session"));
    }
}
