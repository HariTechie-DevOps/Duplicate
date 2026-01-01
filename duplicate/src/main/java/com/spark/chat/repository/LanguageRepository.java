package com.spark.chat.repository;

import com.spark.chat.entities.LanguagePreference;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface LanguageRepository extends JpaRepository<LanguagePreference, Long> {
    Optional<LanguagePreference> findByMobile(String mobile);
}
