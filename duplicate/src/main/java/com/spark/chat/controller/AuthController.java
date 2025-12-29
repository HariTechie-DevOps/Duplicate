package com.spark.chat.controller;

import com.spark.chat.controller.User;
import com.spark.chat.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired 
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        // Step 1: Check if mobile already exists for any user
        if(userRepository.findByMobile(user.getMobile()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Mobile number already registered");
        }
        // Step 2: Store data and generate unique session token
        user.setToken(UUID.randomUUID().toString());
        return ResponseEntity.ok(userRepository.save(user));
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody Map<String, String> loginData) {
        // Step 1: Fetch and validate user from DB
        return userRepository.findByMobileAndPassword(loginData.get("mobile"), loginData.get("password"))
                .map(user -> ResponseEntity.ok(user)) // Returns whole user object + token
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    @PostMapping("/password/reset")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> data) {
        // Step 1: Identify current user by mobile
        return userRepository.findByMobile(data.get("mobile")).map(user -> {
            user.setPassword(data.get("password"));
            userRepository.save(user);
            return ResponseEntity.ok("Password Updated");
        }).orElse(ResponseEntity.notFound().build());
    }
}
