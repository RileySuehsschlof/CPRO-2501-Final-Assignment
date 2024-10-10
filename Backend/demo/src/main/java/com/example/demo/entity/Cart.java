package com.example.demo.entity;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

    @Id
    @NotNull(message = "Id is required")
    private Integer id;

    @NotNull(message = "userId is required")
    private Integer userId;

    @NotNull(message = "productId is required")
    private Integer productId;

    private Integer itemAmount; // aggregate

    private Integer totalPrice; // aggregate
}
