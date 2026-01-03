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

    public String getName() { return name; }
    public String getMobile() { return mobile; }
    public int getAge() { return age; }
    public String getGender() { return gender; }
    public String getPassword() { return password; }
}

