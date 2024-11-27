package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WishlistProductEntity {

    @Id
    @NotNull(message = "Wishlist Product ID is required")
    private String wishlistProductID; // Concatenated WishlistID (User ID) and ProductID

    @NotNull(message = "Wishlist ID (User ID) is required")
    private Integer wishlistID; // Corresponds to the User ID (Customer ID)

    @NotNull(message = "Product ID is required")
    private Integer productID; // Reference to the Product ID

    @NotBlank(message = "Notes are required")
    private String notes; // Allows users to specify why they added this product to their wishlist

    // Constructor that automatically generates wishlistProductID from wishlistID and productID
    public WishlistProductEntity(Integer wishlistID, Integer productID, String notes) {
        this.wishlistID = wishlistID;
        this.productID = productID;
        this.wishlistProductID = generateWishlistProductID(wishlistID, productID);
        this.notes = notes;
    }

    // Helper method to generate WishlistProductID by concatenating WishlistID and ProductID
    private String generateWishlistProductID(Integer wishlistID, Integer productID) {
        return String.valueOf(wishlistID) + "_" + String.valueOf(productID);
    }
}
