package com.example.backendproj;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import com.example.backendproj.controller.RoomReservationController;
import com.example.backendproj.model.RoomReservationEntity;
import com.example.backendproj.model.RoomType;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Date;

@WebMvcTest(RoomReservationController.class)
public class RoomReservationControllerBDDTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {

    }

    @Test
    public void testCreateReservation() throws Exception {
        RoomReservationEntity reservation = new RoomReservationEntity();
        reservation.setRoomNumber(101);
        reservation.setCheckInDate(new Date());
        reservation.setCheckOutDate(new Date());
        reservation.setType(RoomType.THREE_DOUBLE_BED_ROOM);
        reservation.setStatus("CONFIRMED");
        reservation.setEmail("test@example.com");
        reservation.setPhone("1234567890");

        mockMvc.perform(post("/reservations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(reservation)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.id").exists());
    }

    @Test
    public void testGetAllReservations() throws Exception {
        mockMvc.perform(get("/reservations")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray());
    }

    @Test
    public void testGetReservationById() throws Exception {
        mockMvc.perform(get("/reservations/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.id").value(1));
    }

    @Test
    public void testUpdateReservation() throws Exception {
        RoomReservationEntity reservation = new RoomReservationEntity();
        reservation.setRoomNumber(102);
        reservation.setCheckInDate(new Date());
        reservation.setCheckOutDate(new Date());
        reservation.setType(RoomType.ONE_DOUBLE_ONE_SINGLE_BED_ROOM);
        reservation.setStatus("CONFIRMED");
        reservation.setEmail("update@example.com");
        reservation.setPhone("0987654321");

        mockMvc.perform(put("/reservations/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(reservation)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.roomNumber").value(102));
    }

    @Test
    public void testDeleteReservation() throws Exception {
        mockMvc.perform(delete("/reservations/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}
