package com.example.demo.entity;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

    @Id
    @NotNull(message = "Id is required") // @NotNull is used to make sure insertions are not blank
    private Integer id;

    @NotNull(message = "Email is required")
    private String userEmail;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> items = new ArrayList<>(); // List of items in the cart

    public BigDecimal getTotalPrice() {
        return items.stream()
                .map(CartItem::getTotalPrice) // Aggregate item prices
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
