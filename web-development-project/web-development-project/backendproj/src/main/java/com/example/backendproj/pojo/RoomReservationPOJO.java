package com.example.backendproj.pojo;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomReservationPOJO {
    private int roomNumber;
    private Date checkInDate;
    private Date checkOutDate;
    private String type;
    private String email;
    private String phone;
}
