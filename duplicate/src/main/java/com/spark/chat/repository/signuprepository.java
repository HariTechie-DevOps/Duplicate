package com.spark.chat.repository;
import java.util.List;

import com.spark.chat.repository.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface signuprepository extends JpaRepository<User, Long> {
   List<user> findByName(String name);
}




