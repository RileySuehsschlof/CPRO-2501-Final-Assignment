package com.example.demo.entity;

import com.example.demo.exception.customAnnotation.ValidBigDecimal;
import com.example.demo.exception.customAnnotation.ValidInteger;
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
public class WishlistProductEntity {
    @Id
    @NotNull(message = "Must have a Wishlist Product ID")
    private String wishlistProductID; // Unique ID for the wishlist product, which right now is the concatenation of WishlistID and ProductID

    @NotNull(message = "Must have a Wishlist ID")
    private Integer wishlistID; // This can correspond to the Customer ID

    @NotNull(message = "Must have a Product ID")
    private Integer productID; // The ID of the product

    @Lob
    private byte[] img; // Store image as byte array if needed

    @NotNull(message = "Must have a Product Name")
    private String productName; // Name of the product

    @ValidBigDecimal(message = "Must be a valid decimal")
    @NotNull(message = "Must have a Price")
    private BigDecimal price; // Using BigDecimal for price

    @NotNull(message = "Must have Notes")
    private String notes; // Any additional notes for the wishlist item

}
