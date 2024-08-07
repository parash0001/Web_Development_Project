package com.example.backendproj.repository;


import com.example.backendproj.model.RoomReservationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomReservationRepository extends JpaRepository<RoomReservationEntity, Long> {
    boolean existsByRoomNumberAndStatus(int roomNumber, String status);
}
