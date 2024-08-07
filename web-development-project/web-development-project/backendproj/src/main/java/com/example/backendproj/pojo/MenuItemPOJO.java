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
public class MenuItemPOJO {

    private String name;
    private String category; // Enum values as String
    private String type; // Enum values as String
    private double price;
    private List<String> imageUrls;


}
