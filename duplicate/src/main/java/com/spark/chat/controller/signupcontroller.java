package com.spark.chat.controller;

@RestController
@CrossOrigin
public class signupcontroller {
    
    @PostMapping("/api/signup")
    public signupresponse signup(@RequestBody signuprequest request) {
        
        return handlesignup(request);
    }
}



