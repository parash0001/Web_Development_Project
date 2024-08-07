package com.example.backendproj.controller;


import com.example.backendproj.model.UserEntity;
import com.example.backendproj.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backendproj.response.ApiResponse;


import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserEntity>> registerUser(@RequestBody UserEntity user) {
        try {
            UserEntity registeredUser = userService.registerUser(user);
            ApiResponse<UserEntity> response = new ApiResponse<>(true, registeredUser, "User registered successfully.");
            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            ApiResponse<UserEntity> response = new ApiResponse<>(false, null, "User Already Exists With This Email");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/login")
    public ResponseEntity<UserEntity> login(@RequestParam String email, @RequestParam String password) {
        UserEntity user = userService.loginUser(email, password);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.status(401).build();
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable Long id) {
        UserEntity user = userService.getUserById(id);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/admin/users")
    public ResponseEntity<ApiResponse<List<UserEntity>>> getAllUsers() {
        List<UserEntity> users = userService.getAllUsers();
        ApiResponse<List<UserEntity>> response = new ApiResponse<>(true, users, "Users retrieved successfully");
        return ResponseEntity.ok(response);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping("/admin/edit-user/{id}")
    public ResponseEntity<ApiResponse<UserEntity>> updateUser(@PathVariable Long id, @RequestBody UserEntity user) {
        UserEntity updatedUser = userService.updateUser(id, user);
        if (updatedUser != null) {
            ApiResponse<UserEntity> response = new ApiResponse<>(true, updatedUser, "User updated successfully");
            return ResponseEntity.ok(response);
        } else {
            ApiResponse<UserEntity> response = new ApiResponse<>(false, null, "User not found");
            return ResponseEntity.ok(response);
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/admin/user/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        ApiResponse<Void> response = new ApiResponse<>(true, null, "User deleted successfully");
        return ResponseEntity.ok(response);
    }

}

