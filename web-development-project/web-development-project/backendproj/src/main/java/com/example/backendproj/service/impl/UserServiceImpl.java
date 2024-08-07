package com.example.backendproj.service.impl;

import com.example.backendproj.model.LoginEntity;
import com.example.backendproj.model.UserEntity;
import com.example.backendproj.repository.UserRepository;
import com.example.backendproj.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;


    @Autowired // Inject the PasswordEncoder
    private PasswordEncoder passwordEncoder;

    @Override
    public UserEntity registerUser(UserEntity user) {
        // Check if the email already exists
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Email already in use");
        }
        // Encode password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public LoginEntity registerUser(LoginEntity user) {
        return null;
    }

    @Override
    public UserEntity loginUser(String email, String password) {
        UserEntity user = userRepository.findByEmail(email);
        // Implement password matching logic
        return user;
    }

    @Override
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public UserEntity getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public LoginEntity updateUser(Long id, LoginEntity user) {
        return null;
    }

    @Override
    public UserEntity updateUser(Long id, UserEntity user) {
        UserEntity existingUser = userRepository.findById(id).orElse(null);
        if (existingUser != null) {
            existingUser.setName(user.getName());
            existingUser.setEmail(user.getEmail());
            existingUser.setRole(user.getRole());
            return userRepository.save(existingUser);
        }
        return null;
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
