package com.example.backendproj.controller;

import com.example.backendproj.model.RoomReservationEntity;
import com.example.backendproj.repository.RoomReservationRepository;
import com.example.backendproj.response.ApiResponse;
import com.example.backendproj.service.RoomReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reservations")
public class RoomReservationController {

    @Autowired
    private RoomReservationService roomReservationService;

    @PostMapping
    public ResponseEntity<ApiResponse<RoomReservationEntity>> createReservation(@RequestBody RoomReservationEntity reservation) {
        try {
            RoomReservationEntity createdReservation = roomReservationService.createReservation(reservation);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse<>(true, createdReservation, "Reservation created successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(false, null, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, null, "Error: " + e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<RoomReservationEntity>>> getAllReservations() {
        List<RoomReservationEntity> reservations = roomReservationService.getAllReservations();
        return ResponseEntity.ok(new ApiResponse<>(true, reservations, "Reservations fetched successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RoomReservationEntity>> getReservationById(@PathVariable Long id) {
        return roomReservationService.getReservationById(id)
                .map(reservation -> ResponseEntity.ok(new ApiResponse<>(true, reservation, "Reservation fetched successfully")))
                .orElse(ResponseEntity.status(404).body(new ApiResponse<>(false, null, "Reservation not found")));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<RoomReservationEntity>> updateReservation(@PathVariable Long id, @RequestBody RoomReservationEntity reservation) {
        try {
            RoomReservationEntity updatedReservation = roomReservationService.updateReservation(id, reservation);
            return ResponseEntity.ok(new ApiResponse<>(true, updatedReservation, "Reservation updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse<>(false, null, "Error: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteReservation(@PathVariable Long id) {
        try {
            roomReservationService.deleteReservation(id);
            return ResponseEntity.ok(new ApiResponse<>(true, null, "Reservation deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, null, "Error: " + e.getMessage()));
        }
    }
}
