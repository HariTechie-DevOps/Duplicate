package com.spark.chat.repository;
import org.springframework.stereotype.Repository;
import com.spark.chat.entity.LanguagePreference;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface LanguageRepository extends JpaRepository<LanguagePreference, Long> {
    Optional<LanguagePreference> findByMobile(String mobile);
}
