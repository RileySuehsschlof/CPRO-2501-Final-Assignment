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
    @NotNull(message = "Id is required") // @NotNull is used to make sure insertions are not blank
    private Integer id;

    @NotNull(message = "userId is required")
    private Integer userId;

    @NotNull(message = "productId is required")
    private Integer productId;

    private Integer itemAmount; // aggregate

    private Integer totalPrice; // aggregate
}
