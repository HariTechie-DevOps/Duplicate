package com.spark.chat.controller;

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




