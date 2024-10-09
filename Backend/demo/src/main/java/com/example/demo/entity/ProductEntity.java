package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductEntity {
    @Id
    @NotNull
    private Integer id;

    @Lob
    private byte[] img; // Store image as byte array instead of Image

    @NotNull
    private String productName;
    @NotNull
    private Integer quantity;
    @NotNull
    private BigDecimal price; // Using BigDecimal for price
    @NotNull
    private BigDecimal discount; // Using BigDecimal for discount
    @NotNull
    private String category;
}
