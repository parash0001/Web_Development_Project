package com.example.backendproj.service;

import com.example.backendproj.pojo.LoginRequest;
import com.example.backendproj.pojo.RegisterRequest;
import com.example.backendproj.pojo.RegisterResponse;

public interface AuthService {
    RegisterResponse login(LoginRequest loginRequest);
    RegisterResponse register(RegisterRequest registerRequest); // Update this line
}
