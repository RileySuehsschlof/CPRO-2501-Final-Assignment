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
    @NotNull(message = "Must have a Id")
    private Integer id;

    @Lob
    private byte[] img; // Store image as byte array instead of Image

    @NotNull(message = "Must have a Product Name")
    private String productName;
    @NotNull(message = "Must have a quantity")
    private Integer quantity;
    @NotNull(message = "Must have a Price")
    private BigDecimal price; // Using BigDecimal for price
    @NotNull(message = "Must have a Discount")
    private BigDecimal discount; // Using BigDecimal for discount
    @NotNull(message = "Must have a Category")
    private String category;
}
