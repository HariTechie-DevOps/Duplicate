package com.spark.chat.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity 
@Data 
@Table(name = "users")
public class User {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    public String name;
    public Integer age;
    public String gender;
    
    @Column(unique = true) 
    public String mobile;
    public String password;
    public String token;

    public void setPassword(String password) { this.password = password; }
    public String getPassword() { return this.password; }
    public void setToken(String token) { this.token = token; }
    public String getName() { return this.name; }
}


