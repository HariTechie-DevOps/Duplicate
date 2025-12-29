package com.spark.chat.repository;

import com.spark.chat.repository.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByMobile(String mobile);
    Optional<User> findByMobileAndPassword(String mobile, String password);
}
