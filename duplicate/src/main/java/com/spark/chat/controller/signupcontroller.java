package com.spark.chat.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
// Add imports for your own classes too:
import com.spark.chat.services.signupservices; 
import com.spark.chat.dto.signuprequest;

@RestController
@CrossOrigin
public class signupcontroller {

    public signupservies services;

    public signupcontroller(signupservies services){
        this.services = services;
    }
    
    @PostMapping("/api/signup")
    public signupresponse signup(@RequestBody signuprequest request) {
        
        return services.handlesignup(request);
    }
}





