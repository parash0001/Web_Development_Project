package com.example.backendproj.service;

import com.example.backendproj.model.RoomReservationEntity;

import java.util.List;
import java.util.Optional;

public interface RoomReservationService {
    RoomReservationEntity createReservation(RoomReservationEntity reservation);
    List<RoomReservationEntity> getAllReservations();
    Optional<RoomReservationEntity> getReservationById(Long id);
    RoomReservationEntity updateReservation(Long id, RoomReservationEntity reservation);
    void deleteReservation(Long id);
}
