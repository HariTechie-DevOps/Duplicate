package com.spark.chat.controller;

@RestController
@CrossOrigin
public class signupcontroller {

    @Autowired 
    
    @PostMapping("/api/signup")
    public signupresponse signup(@RequestBody signuprequest request) {
        if(!request.name.equals("/^[A-Za-z ]{3,}$/")){
            return new signupresponse(false,"invalid name");
        }
        if(request.age < 18 || request.age > 100 ){
            return new signupresponse(false,"invalid age");
        }
        if(!request.gender.equals("")){
            return new signupresponse(false,"invalid gender");
        }
        if(!request.mobile.equals("/^[0-9]{7,15}$/")){
            return new signupresponse(false,"invalid mobile number");
        }
        if(!request.password.equals("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/")){
            return new signupresponse(false,"invalid password");
        }
       return new signupresponse(true,"signup successfully");
    }

}

