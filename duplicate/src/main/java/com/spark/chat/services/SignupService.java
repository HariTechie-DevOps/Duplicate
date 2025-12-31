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
    // 1. CLEAN THE NUMBER: Remove "+" and "91" if they exist
    // Fast2SMS usually wants just the 10 digits (e.g., 9876543210)
    String cleanMobile = mobile.replace("+", "");
    if (cleanMobile.startsWith("91") && cleanMobile.length() > 10) {
        cleanMobile = cleanMobile.substring(2);
    }

    // 2. Generate 6 digit OTP
    String otp = String.format("%06d", new Random().nextInt(999999));
    otpStorage.put(mobile, otp); // Keep the original 'mobile' as key for mapping

    try {
        // 3. Construct URL
        String urlString = "https://www.fast2sms.com/dev/bulkV2?authorization=" + FAST2SMS_KEY +
                "&route=otp&variables_values=" + otp + "&numbers=" + cleanMobile;
        
        System.out.println("DEBUG: Sending OTP to: " + cleanMobile); // Look for this in Ubuntu terminal
        
        URL url = new URL(urlString);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");

        // 4. READ THE ACTUAL RESPONSE from Fast2SMS
        int responseCode = conn.getResponseCode();
        if (responseCode == 200) {
            return new SignupResponse(true, null, "OTP sent successfully to " + cleanMobile);
        } else {
            // Read error stream to see WHY it failed (e.g., No Balance)
            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
            String inputLine;
            StringBuilder errorResponse = new StringBuilder();
            while ((inputLine = in.readLine()) != null) { errorResponse.append(inputLine); }
            in.close();
            System.err.println("Fast2SMS Error: " + errorResponse.toString());
            return new SignupResponse(false, "error", "Fast2SMS Error: " + responseCode);
        }
    } catch (Exception e) {
        return new SignupResponse(false, "error", "Failed to send SMS: " + e.getMessage());
    }
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
