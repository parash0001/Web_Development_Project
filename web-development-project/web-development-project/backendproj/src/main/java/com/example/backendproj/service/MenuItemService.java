package com.example.backendproj.service;

import com.example.backendproj.model.MenuItem;

import java.util.List;
import java.util.Optional;

public interface MenuItemService {

    MenuItem createMenuItem(MenuItem menuItem);
    List<MenuItem> getAllMenuItems();
    Optional<MenuItem> getMenuItemById(Long id);
    MenuItem updateMenuItem(Long id, MenuItem menuItemDetails);
    void deleteMenuItem(Long id);


}
