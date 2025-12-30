package com.spark.chat.servies;
import com.spark.chat.repository;
  
class signupservies {

  public signuprepository repo;

  public signupservies(signuprepository repo){
    this.repo = repo;
  }
  
  public signuprequest handlesignup(@RequestBody signuprequest request){
    
    user users = repo.findByName(request.name);
    
    if(users == null){
      return new signupresponse(false,"user not found");
    }
    if(!users.age.equals(request.age)){
      return new signupresponse(false,"invalid age");
    }
    if(!users.gender.equals(request.gender)){
       return new signupresponse(false,"invalid gender");
    }
    if(!users.mobile.equals(request.mobile)){
      return new signupresponse(false,"invalid mobile number");
    }
    if(!users.password.equals(request.password)){
      return new signupresponse(false,"invalid password");
    }
    return new signupresponse(true,"signup successfully");
  }
  
}
