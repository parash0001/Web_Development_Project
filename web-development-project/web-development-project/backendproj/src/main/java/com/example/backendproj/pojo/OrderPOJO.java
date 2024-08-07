package com.example.backendproj.pojo;



import lombok.Getter;
import lombok.Setter;

import java.util.List;



@Getter
@Setter
public class OrderPOJO {

    private String customerId; // Reference to User
    private List<OrderItemPOJO> items;
    private double totalPrice;
    private String status;
    private String deliveryType;
    private String roomId; // Reference to Room
    private String address;
    private String tableId; // Reference to Table
    private String email;
    private String phone;


}
