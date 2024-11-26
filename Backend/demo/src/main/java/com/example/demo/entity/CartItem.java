package com.example.demo.entity;
import com.example.demo.exception.customAnnotation.ValidBigDecimal;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private ProductEntity product;

    @NotNull(message = "Quantity is required")
    private Integer quantity;

    @Transient
    @ValidBigDecimal(message = "Must be a valid decimal")
    private String totalPrice; // Derived dynamically

    public BigDecimal getTotalPrice() {
        return new BigDecimal(product.getPrice()).multiply(new BigDecimal(quantity));
    }

    
}
