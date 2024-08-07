package com.example.backendproj;

import com.example.backendproj.controller.UserController;
import com.example.backendproj.model.UserEntity;
import com.example.backendproj.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(UserController.class)
public class UserControllerTDDTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    private UserEntity user;

    @Before
    public void setUp() {
        user = new UserEntity();
        user.setId(1L);
        user.setName("John Doe");
        user.setEmail("admine@gmail.com");
        user.setPassword("admin123");
        user.setRole("guest");
    }

    @Test
    public void testRegisterUser() throws Exception {
        when(userService.registerUser(any(UserEntity.class))).thenReturn(user);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.email").value(user.getEmail()))
                .andExpect(jsonPath("$.message").value("User registered successfully."));

        verify(userService, times(1)).registerUser(any(UserEntity.class));
    }

    @Test
    public void testLoginUser() throws Exception {
        when(userService.loginUser(user.getEmail(), user.getPassword())).thenReturn(user);

        mockMvc.perform(post("/api/auth/login")
                        .param("email", user.getEmail())
                        .param("password", user.getPassword()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value(user.getEmail()));

        verify(userService, times(1)).loginUser(user.getEmail(), user.getPassword());
    }

    @Test
    public void testGetAllUsers() throws Exception {
        when(userService.getAllUsers()).thenReturn(Collections.singletonList(user));

        mockMvc.perform(get("/api/user/admin/users")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data[0].email").value(user.getEmail()))
                .andExpect(jsonPath("$.message").value("Users retrieved successfully"));

        verify(userService, times(1)).getAllUsers();
    }

    @Test
    public void testGetUserById() throws Exception {
        when(userService.getUserById(1L)).thenReturn(user);

        mockMvc.perform(get("/api/user/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value(user.getEmail()));

        verify(userService, times(1)).getUserById(1L);
    }

    @Test
    public void testUpdateUser() throws Exception {
        when(userService.updateUser(anyLong(), any(UserEntity.class))).thenReturn(user);

        mockMvc.perform(put("/api/user/admin/edit-user/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.email").value(user.getEmail()))
                .andExpect(jsonPath("$.message").value("User updated successfully"));

        verify(userService, times(1)).updateUser(anyLong(), any(UserEntity.class));
    }

    @Test
    public void testDeleteUser() throws Exception {
        doNothing().when(userService).deleteUser(1L);

        mockMvc.perform(delete("/api/user/admin/user/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("User deleted successfully"));

        verify(userService, times(1)).deleteUser(1L);
    }
}
