package com.example.demo.exception;

import lombok.Getter;

@Getter
public class WishlistProductException extends RuntimeException {

    private final String errorCode;

    public WishlistProductException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    // Existing exception methods for product-related errors
    public static WishlistProductException invalidWishlistProductId() {
        return new WishlistProductException("Invalid Wishlist Product ID. ID cannot be empty.", "INVALID_WISHLIST_PRODUCT_ID");
    }

    public static WishlistProductException wishlistProductNotFound(String wishlistProductID) {
        return new WishlistProductException("No Wishlist Product found with ID: " + wishlistProductID, "WISHLIST_PRODUCT_NOT_FOUND");
    }

    public static WishlistProductException idAlreadyExists(String wishlistProductID) {
        return new WishlistProductException("The Wishlist Product ID: " + wishlistProductID + " is already in use", "ID_IN_USE");
    }

    // New exception methods for user-related errors
    public static WishlistProductException accountNotFound(Integer wishlistID) {
        return new WishlistProductException("Account not found for wishlistID: " + wishlistID, "ACCOUNT_NOT_FOUND");
    }

    public static WishlistProductException noProductsInWishlist(Integer wishlistID) {
        return new WishlistProductException("No products found in wishlist for user with ID: " + wishlistID, "NO_PRODUCTS_IN_WISHLIST");
    }
}
