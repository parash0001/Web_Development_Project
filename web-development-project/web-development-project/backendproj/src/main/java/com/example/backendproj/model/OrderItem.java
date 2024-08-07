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
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "menu_item_id") // Reference to Kitchen
    private String menuItemId;

    private int quantity;

    @Column(name = "order_id")
    private Long orderId; // Foreign key reference to OrderEntity

    @Column(name = "category")
    private String category;

    @Column(name = "type")
    private String type;

    private double price;
}

