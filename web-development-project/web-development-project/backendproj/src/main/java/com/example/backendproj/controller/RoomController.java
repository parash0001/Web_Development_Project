package com.example.backendproj.controller;



import com.example.backendproj.pojo.RoomPOJO;
import com.example.backendproj.model.RoomEntity;
import com.example.backendproj.response.ApiResponse;
import com.example.backendproj.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping
    public ResponseEntity<ApiResponse<RoomEntity>> addRoom(@RequestBody RoomPOJO roomPOJO) {
        try {
            RoomEntity newRoom = roomService.addRoom(roomPOJO);
            return ResponseEntity.status(201).body(new ApiResponse<>(true, newRoom, "Room added successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse<>(false, null, "Error: " + e.getMessage()));
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping
    public ResponseEntity<ApiResponse<List<RoomEntity>>> getAllRooms() {
        List<RoomEntity> rooms = roomService.getAllRooms();
        return ResponseEntity.ok(new ApiResponse<>(true, rooms, "Rooms retrieved successfully"));
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RoomEntity>> getRoomById(@PathVariable Long id) {
        Optional<RoomEntity> room = roomService.getRoomById(id);
        return room.map(r -> ResponseEntity.ok(new ApiResponse<>(true, r, "Room retrieved successfully")))
                .orElseGet(() -> ResponseEntity.status(404).body(new ApiResponse<>(false, null, "Room not found")));
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<RoomEntity>> updateRoom(@PathVariable Long id, @RequestBody RoomPOJO roomPOJO) {
        try {
            RoomEntity updatedRoom = roomService.updateRoom(id, roomPOJO);
            return ResponseEntity.ok(new ApiResponse<>(true, updatedRoom, "Room updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse<>(false, null, "Error: " + e.getMessage()));
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteRoom(@PathVariable Long id) {
        try {
            roomService.deleteRoom(id);
            return ResponseEntity.ok(new ApiResponse<>(true, "Room deleted successfully", null));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse<>(false, null, "Error: " + e.getMessage()));
        }
    }
}
