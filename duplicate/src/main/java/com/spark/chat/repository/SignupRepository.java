package com.spark.chat.repository;

import com.spark.chat.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query; 
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface SignupRepository extends JpaRepository<User, Long> {
    Optional<User> findByMobile(String mobile);

    @Query("SELECT u FROM User u WHERE u.mobile LIKE %:mobile")
    Optional<User> findByMobileFlexible(@Param("mobile") String mobile);
    
}


