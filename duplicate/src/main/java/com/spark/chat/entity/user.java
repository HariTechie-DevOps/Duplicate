package com.spark.chat.entity;

import jakarta.persistence.*;

@Entity 
@Data 
@Table(name = "users")
public class user {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Integer age;
    private String gender;
    
    @Column(unique = true) 
    private String mobile;
    private String password;
    private String token; 
}

