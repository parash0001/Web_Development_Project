package com.example.backendproj.repository;

import com.example.backendproj.model.LoginEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepository extends JpaRepository<LoginEntity, Long> {
    LoginEntity findByEmail(String email);
}
