// Filename: UserService.java
package com.example.backendproj.service;

import com.example.backendproj.model.LoginEntity;
import com.example.backendproj.model.UserEntity;

import java.util.List;

public interface UserService {
    UserEntity registerUser(UserEntity user);

    LoginEntity registerUser(LoginEntity user);
    UserEntity loginUser(String email, String password);
    List<UserEntity> getAllUsers();
    UserEntity getUserById(Long id);
    LoginEntity updateUser(Long id, LoginEntity user);

    UserEntity updateUser(Long id, UserEntity user);

    void deleteUser(Long id);

}
