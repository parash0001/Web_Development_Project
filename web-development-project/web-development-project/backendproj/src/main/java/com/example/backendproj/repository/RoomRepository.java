package com.example.backendproj.repository;


import com.example.backendproj.model.RoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<RoomEntity, Long> {
    Optional<RoomEntity> findByRoomNumber(int roomNumber);
}
