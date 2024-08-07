package com.example.backendproj.controller;



import com.example.backendproj.model.OrderEntity;
import com.example.backendproj.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/place-order")
    public ResponseEntity<?> placeOrder(@RequestBody OrderEntity order) {
        try {
            OrderEntity createdOrder = orderService.placeOrder(order);
            return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>("Error: could not execute statement due to constraint violation. Please ensure all fields are correctly populated.", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/{id}")
    public ResponseEntity<OrderEntity> getOrderById(@PathVariable String id) {
        OrderEntity order = orderService.getOrderById(id);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping
    public ResponseEntity<List<OrderEntity>> getAllOrders() {
        List<OrderEntity> orders = orderService.getAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateOrder(@PathVariable String id, @RequestBody OrderEntity order) {
        try {
            OrderEntity updatedOrder = orderService.updateOrder(id, order);
            return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>("Error: could not execute statement due to constraint violation. Please ensure all fields are correctly populated.", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable String id) {
        orderService.deleteOrder(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
