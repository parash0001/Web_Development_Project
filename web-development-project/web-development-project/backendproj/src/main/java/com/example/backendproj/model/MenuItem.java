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
@Table(name = "menu_items")
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Type type;

    @Column(nullable = false)
    private double price;

    @ElementCollection
    private List<String> imageUrls;

    public enum Category {
        APPETIZER, MAIN_COURSE, DESSERT, BEVERAGE, SNACK, SALAD, SOUP, SIDE_DISH, BREAKFAST, LUNCH, DINNER, SPECIAL
    }


    public enum Type {
        VEGETARIAN, NON_VEGETARIAN, VEGAN
    }

}
