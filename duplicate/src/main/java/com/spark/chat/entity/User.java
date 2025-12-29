package com.spark.chat.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity 
@Data 
@Table(name = "users")
public class User {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private Integer age;
    private String gender;
    
    @Column(unique = true) // Ensures Nth user mobile uniqueness
    private String mobile;
    
    private String password;
    private String token; // For Remember Me functionality
}
