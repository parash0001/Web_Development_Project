package com.example.backendproj.model;




import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.persistence.*;
import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders")
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "customer_id")
    private String customerId; // Reference to User

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id") // Foreign key in OrderItem table
    private List<OrderItem> items;

    @Column(name = "total_price")
    private double totalPrice;

    @Column(name = "status") // Enum: Pending, Preparing, Completed, Cancelled
    private String status;

    @Column(name = "delivery_type") // Enum: RoomService, Hotel, HomeDelivery, Table
    private String deliveryType;

    @Column(name = "room_id") // Reference to Room
    private String roomId;

    private String address;

    @Column(name = "table_id") // Reference to Table
    private String tableId;

    private String email;
    private String phone;
}
