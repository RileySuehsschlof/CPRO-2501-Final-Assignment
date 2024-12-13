package com.example.demo.entity;
import com.example.demo.exception.customAnnotation.ValidBigDecimal;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    @JsonBackReference
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ProductEntity product;

    @NotNull(message = "Quantity is required")
    private Integer quantity;

    @Transient
    @ValidBigDecimal(message = "Must be a valid decimal")
    private String totalPrice; // Derived dynamically

    public BigDecimal getTotalPrice() {
        if (product != null && product.getPrice() != null) {
            try {
                BigDecimal price = new BigDecimal(product.getPrice());
                return price.multiply(BigDecimal.valueOf(quantity));
            } catch (NumberFormatException e) {
                // Handle invalid price format
                return BigDecimal.ZERO;
            }
        }
        return BigDecimal.ZERO;
    }

    
}
