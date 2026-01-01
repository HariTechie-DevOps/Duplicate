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

    public SignupService(SignupRepository repo){
        this.repo = repo;
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
        System.out.println("DEBUG: Attempting to update password for: " + mobile);
    
        return repo.findByMobile(mobile)
            .map(user -> {
                user.setPassword(newPassword);
                repo.save(user);
                System.out.println("DEBUG: Password updated in MySQL for " + mobile);
                return new SignupResponse(true, null, "Password changed successfully!");
            })
            .orElseGet(() -> {
                System.out.println("DEBUG: User not found for " + mobile);
                return new SignupResponse(false, "mobile", "User not found");
            });
    } 
}
