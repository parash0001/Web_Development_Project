package com.example.backendproj.pojo;


import com.example.backendproj.model.LoginEntity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtResponse {
    private boolean success;
    private String message;
    private String token;
    private LoginEntity user;

    public JwtResponse(boolean success, String message, String token, LoginEntity user) {
        this.success = success;
        this.message = message;
        this.token = token;
        this.user = user;
    }

}
