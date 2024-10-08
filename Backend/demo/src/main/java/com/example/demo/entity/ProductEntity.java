package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductEntity {
    @Id
    private int id;

    @Lob
    private byte[] img; // Store image as byte array instead of Image

    private String productName;
    private Integer quantity;

    private BigDecimal price; // Use BigDecimal for price
    private BigDecimal discount; // Use BigDecimal for discount

    private String category;
}
