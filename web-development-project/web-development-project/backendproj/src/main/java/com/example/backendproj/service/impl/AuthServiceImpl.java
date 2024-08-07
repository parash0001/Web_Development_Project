package com.example.backendproj.service.impl;

import com.example.backendproj.model.LoginEntity;
import com.example.backendproj.pojo.LoginRequest;
import com.example.backendproj.pojo.RegisterRequest;
import com.example.backendproj.pojo.RegisterResponse;
import com.example.backendproj.repository.LoginRepository;
import com.example.backendproj.security.JwtTokenProvider;
import com.example.backendproj.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public RegisterResponse login(LoginRequest loginRequest) {
        LoginEntity user = loginRepository.findByEmail(loginRequest.getEmail());
        if (user != null && passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            String token = jwtTokenProvider.createToken(user.getEmail());
            return new RegisterResponse(true, "Login successful", token, user);
        }
        throw new RuntimeException("Invalid email or password");
    }

    @Override
    public RegisterResponse register(RegisterRequest registerRequest) {
        System.out.println("Registering user: " + registerRequest.getEmail());

        // Check if the email already exists
        if (loginRepository.findByEmail(registerRequest.getEmail()) != null) {
            return new RegisterResponse(false, "User With This Email Already Exists !!! Sorry Cant Create Account, Please Try Again With Another Email", null, null);
        }

        LoginEntity newUser = new LoginEntity();
        newUser.setUsername(registerRequest.getUsername());
        newUser.setEmail(registerRequest.getEmail());
        newUser.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        newUser.setDateOfBirth(registerRequest.getDateOfBirth());
        newUser.setFirstName(registerRequest.getFirstName());
        newUser.setLastName(registerRequest.getLastName());
        newUser.setPhoneNumber(registerRequest.getPhoneNumber());
        newUser.setIsAdmin(false); // Ensure this is set

        LoginEntity savedUser = loginRepository.save(newUser);

        // Generate a JWT token for the newly registered user
        String token = jwtTokenProvider.createToken(savedUser.getEmail());

        return new RegisterResponse(true, "Registration successful!", token, savedUser);
    }
}
