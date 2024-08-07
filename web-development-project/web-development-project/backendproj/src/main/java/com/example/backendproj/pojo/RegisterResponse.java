package com.example.backendproj.pojo;



import com.example.backendproj.model.LoginEntity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterResponse {
    private boolean success;
    private String message;
    private String token;
    private LoginEntity user;

    public RegisterResponse(boolean success, String message, String token, LoginEntity user) {
        this.success = success;
        this.message = message;
        this.token = token;
        this.user = user;
    }


}
