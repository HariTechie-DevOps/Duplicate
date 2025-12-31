package com.spark.chat.services;

import com.spark.chat.entity.User;
import com.spark.chat.repository.SignupRepository;
import com.spark.chat.dto.SignupRequest;
import com.spark.chat.dto.SignupResponse;
import org.springframework.stereotype.Service;

import java.net.HttpURLConnection;
import java.net.URL;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

// Inside SignupService class:
private final String FAST2SMS_KEY = "273o16HgyGabwheWFQT4JtkRplVdLiIXB5j0YPxAmMON8zvUrSNZG2BSCTRU9uj0npIb4dy8Mq3Ycz5h"; // Replace with your real key
private final ConcurrentHashMap<String, String> otpStorage = new ConcurrentHashMap<>();

@Service
public class SignupService {

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
        // 1. Generate 6 digit OTP
        String otp = String.format("%06d", new Random().nextInt(999999));
        otpStorage.put(mobile, otp); // Save it to compare later

        try {
            // 2. Fast2SMS API URL (Using the 'Authorization' method)
            String urlString = "https://www.fast2sms.com/dev/bulkV2?authorization=" + FAST2SMS_KEY +
                "&route=otp&variables_values=" + otp + "&numbers=" + mobile;
            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            if (conn.getResponseCode() == 200) {
                return new SignupResponse(true, null, "OTP sent successfully to " + mobile);
            }
        } catch (Exception e) {
            return new SignupResponse(false, "error", "Failed to send SMS: " + e.getMessage());
        }
        return new SignupResponse(false, "error", "SMS Provider Error");
    }
    
    public SignupResponse verifyOtp(String mobile, String userOtp) {
        String savedOtp = otpStorage.get(mobile);
        if (savedOtp != null && savedOtp.equals(userOtp)) {
            otpStorage.remove(mobile); // Clear it after successful verification
            return new SignupResponse(true, null, "OTP Verified!");
        }
        return new SignupResponse(false, "otp", "Invalid OTP entered.");
    }
}
