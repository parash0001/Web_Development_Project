package com.example.backendproj.service;

import com.example.backendproj.model.OrderEntity;

import java.util.List;

public interface OrderService {
    OrderEntity placeOrder(OrderEntity order);
    OrderEntity getOrderById(String id);
    List<OrderEntity> getAllOrders();
    OrderEntity updateOrder(String id, OrderEntity order);
    void deleteOrder(String id);
}
