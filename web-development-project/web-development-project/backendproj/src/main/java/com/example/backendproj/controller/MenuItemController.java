package com.example.backendproj.controller;

import com.example.backendproj.model.MenuItem;
import com.example.backendproj.response.ApiResponse;
import com.example.backendproj.service.MenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuItemController {

    @Autowired
    private MenuItemService menuItemService;

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<MenuItem>> createMenuItem(@RequestBody MenuItem menuItem) {
        try {
            MenuItem createdMenuItem = menuItemService.createMenuItem(menuItem);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse<>(true, createdMenuItem, "Menu item created successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, null, "Error: " + e.getMessage()));
        }
    }

    @GetMapping("/")
    public ResponseEntity<ApiResponse<List<MenuItem>>> getAllMenuItems() {
        List<MenuItem> menuItems = menuItemService.getAllMenuItems();
        return ResponseEntity.ok(new ApiResponse<>(true, menuItems, "Menu items retrieved successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MenuItem>> getMenuItemById(@PathVariable Long id) {
        return menuItemService.getMenuItemById(id)
                .map(menuItem -> ResponseEntity.ok(new ApiResponse<>(true, menuItem, "Menu item retrieved successfully")))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse<>(false, null, "Menu item not found")));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<MenuItem>> updateMenuItem(@PathVariable Long id, @RequestBody MenuItem menuItem) {
        MenuItem updatedMenuItem = menuItemService.updateMenuItem(id, menuItem);
        return ResponseEntity.ok(new ApiResponse<>(true, updatedMenuItem, "Menu item updated successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteMenuItem(@PathVariable Long id) {
        try {
            menuItemService.deleteMenuItem(id);
            return ResponseEntity.ok(new ApiResponse<>(true, null, "Menu item deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, null, "Error: " + e.getMessage()));
        }
    }
}
