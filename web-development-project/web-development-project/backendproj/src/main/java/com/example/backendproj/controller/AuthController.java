package com.example.backendproj.controller;



import com.example.backendproj.pojo.LoginRequest;
import com.example.backendproj.pojo.RegisterRequest;
import com.example.backendproj.pojo.RegisterResponse;
import com.example.backendproj.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<RegisterResponse> login(@RequestBody LoginRequest loginRequest) {
        RegisterResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest registerRequest) {
        RegisterResponse response = authService.register(registerRequest);
        return ResponseEntity.ok(response);
    }
}
