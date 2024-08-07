package com.example.backendproj.service.impl;

import com.example.backendproj.model.RoomReservationEntity;
import com.example.backendproj.repository.RoomReservationRepository;
import com.example.backendproj.service.RoomReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomReservationServiceImpl implements RoomReservationService {

    @Autowired
    private RoomReservationRepository reservationRepository;

    @Override
    public RoomReservationEntity createReservation(RoomReservationEntity reservation) {
        // Check if the room is already booked with a CONFIRMED status
        boolean isRoomBooked = reservationRepository.existsByRoomNumberAndStatus(reservation.getRoomNumber(), "CONFIRMED");
        if (isRoomBooked) {
            throw new IllegalArgumentException("Room already booked.");
        }


        return reservationRepository.save(reservation);
    }

    @Override
    public List<RoomReservationEntity> getAllReservations() {
        return reservationRepository.findAll();
    }

    @Override
    public Optional<RoomReservationEntity> getReservationById(Long id) {
        return reservationRepository.findById(id);
    }

    @Override
    public RoomReservationEntity updateReservation(Long id, RoomReservationEntity reservation) {
        reservation.setId(id);
        return reservationRepository.save(reservation);
    }

    @Override
    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }
}
