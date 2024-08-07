package com.example.backendproj.service.impl;

import com.example.backendproj.model.MenuItem;
import com.example.backendproj.repository.MenuItemRepository;
import com.example.backendproj.service.MenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MenuItemServiceImpl implements MenuItemService {

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Override
    public MenuItem createMenuItem(MenuItem menuItem) {
        return menuItemRepository.save(menuItem);
    }

    @Override
    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

    @Override
    public Optional<MenuItem> getMenuItemById(Long id) {
        return menuItemRepository.findById(id);
    }

    @Override
    public MenuItem updateMenuItem(Long id, MenuItem menuItemDetails) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));

        menuItem.setName(menuItemDetails.getName());
        menuItem.setCategory(menuItemDetails.getCategory());
        menuItem.setType(menuItemDetails.getType());
        menuItem.setPrice(menuItemDetails.getPrice());
        menuItem.setImageUrls(menuItemDetails.getImageUrls());

        return menuItemRepository.save(menuItem);
    }

    @Override
    public void deleteMenuItem(Long id) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));

        menuItemRepository.delete(menuItem);
    }
}
