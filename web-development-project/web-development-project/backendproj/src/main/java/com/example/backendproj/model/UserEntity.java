package com.example.backendproj.model;


import lombok.Getter;
import lombok.Setter;


import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import java.util.Date;

@Entity
@Table(name = "users")
@Getter
@Setter
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @Email
    @NotBlank
    @Column(unique = true)
    private String email;

    @NotBlank
    private String password;

    private boolean isAdmin = false;

    @Column(name = "role", nullable = false)
    private String role = "guest";

    private String refreshToken;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date();

    // Getters and Setters
}
