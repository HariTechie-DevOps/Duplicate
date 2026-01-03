package com.spark.chat.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_preferences")
public class LanguagePreference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "mobile", nullable = false, unique = true)
    private String mobile; 

    private String language;

    // 1. Mandatory No-Args Constructor (Hibernate needs this)
    public LanguagePreference() {}

    // 2. Convenience Constructor (Helpful for your Service)
    public LanguagePreference(String mobile, String language) {
        this.mobile = mobile;
        this.language = language;
    }

    // 3. Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
}
