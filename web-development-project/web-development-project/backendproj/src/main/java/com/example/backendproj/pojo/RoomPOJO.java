package com.example.backendproj.pojo;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RoomPOJO {


    private int roomNumber;
    private String type;
    private double price;
    private boolean isAvailable;
    private List<String> imageUrls;


}
