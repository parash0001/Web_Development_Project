package com.example.backendproj.service.impl;

import com.example.backendproj.model.RoomEntity;
import com.example.backendproj.model.RoomType;
import com.example.backendproj.pojo.RoomPOJO;
import com.example.backendproj.repository.RoomRepository;
import com.example.backendproj.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Override
    public RoomEntity addRoom(RoomPOJO roomPOJO) throws Exception {
        Optional<RoomEntity> existingRoom = roomRepository.findByRoomNumber(roomPOJO.getRoomNumber());
        if (existingRoom.isPresent()) {
            throw new Exception("Room already exists");
        }

        RoomEntity room = new RoomEntity();
        room.setRoomNumber(roomPOJO.getRoomNumber());
        room.setType(RoomType.valueOf(roomPOJO.getType().toUpperCase().replace(" ", "_")));
        room.setPrice(roomPOJO.getPrice());
        room.setImageUrls(roomPOJO.getImageUrls());
        room.setAvailable(roomPOJO.isAvailable());

        return roomRepository.save(room);
    }

    @Override
    public List<RoomEntity> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public Optional<RoomEntity> getRoomById(Long id) {
        return roomRepository.findById(id);
    }

    @Override
    public RoomEntity updateRoom(Long id, RoomPOJO roomPOJO) throws Exception {
        RoomEntity room = roomRepository.findById(id).orElseThrow(() -> new Exception("Room not found"));
        room.setRoomNumber(roomPOJO.getRoomNumber());
        room.setType(RoomType.valueOf(roomPOJO.getType().toUpperCase().replace(" ", "_")));
        room.setPrice(roomPOJO.getPrice());
        room.setImageUrls(roomPOJO.getImageUrls());
        room.setAvailable(roomPOJO.isAvailable());
        room.setUpdatedAt(new java.util.Date());

        return roomRepository.save(room);
    }

    @Override
    public void deleteRoom(Long id) throws Exception {
        RoomEntity room = roomRepository.findById(id).orElseThrow(() -> new Exception("Room not found"));
        roomRepository.delete(room);
    }
}
