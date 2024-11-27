package com.example.demo.controller;

import com.example.demo.entity.WishlistProductEntity;
import com.example.demo.service.WishlistProductService;
import com.example.demo.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wishlistproducts")
public class WishlistProductController {

    @Autowired
    private WishlistProductService wishlistProductService;

    @Autowired
    private AccountService accountService; // Service to fetch Account details

    /**
     * Get all wishlist products.
     * @return list of all wishlist products
     */
    @GetMapping
    public ResponseEntity<List<WishlistProductEntity>> getAllWishlistProducts() {
        List<WishlistProductEntity> wishlistProducts = wishlistProductService.getAllWishlistProducts();
        return ResponseEntity.ok(wishlistProducts);
    }

    /**
     * Get wishlist products by user ID (wishlistID).
     * @param wishlistID the user ID (account ID)
     * @return list of wishlist products for the specified user
     */
    @GetMapping("/wishlist/{wishlistID}")
    public ResponseEntity<List<WishlistProductEntity>> getWishlistByUserId(@PathVariable Integer wishlistID) {
        // Fetch wishlist products for the given user ID
        List<WishlistProductEntity> wishlistProducts = wishlistProductService.getWishlistByUserId(wishlistID);
        return ResponseEntity.ok(wishlistProducts);
    }

    /**
     * Get a specific wishlist product by its ID.
     * @param id the wishlist product ID
     * @return the wishlist product
     */
    @GetMapping("/{id}")  // Corrected path variable usage
    public ResponseEntity<?> getWishlistProductById(@PathVariable String id) {
        WishlistProductEntity wishlistProduct = wishlistProductService.getWishlistProductById(id);
        if (wishlistProduct == null) {
            return ResponseEntity.status(404).body("Wishlist product not found.");
        }
        return ResponseEntity.ok(wishlistProduct);
    }

    /**
     * Add a new wishlist product.
     * @param wishlistProduct the wishlist product entity to be added
     * @return response indicating success or failure
     */
    @PostMapping("/addWish")
    public ResponseEntity<String> saveWishlistProduct(@RequestBody @Valid WishlistProductEntity wishlistProduct) {
        // Ensure the wishlistID corresponds to an existing account (user)
        Integer wishlistID = wishlistProduct.getWishlistID(); // Get the customer/account ID

        // Check if the account exists
        if (accountService.getAccountById(wishlistID) == null) {
            return ResponseEntity.status(400).body("Account with ID " + wishlistID + " does not exist.");
        }

        // Optional: Validate that the wishlistProductID is correctly formed (e.g., "wishlistID-productID")
        if (wishlistProduct.getWishlistProductID() == null || !wishlistProduct.getWishlistProductID().matches("\\d+-\\d+")) {
            return ResponseEntity.status(400).body("Invalid Wishlist Product ID format.");
        }

        // Save the wishlist product
        try {
            wishlistProductService.saveWishlistProduct(wishlistProduct);
            return ResponseEntity.status(201).body("Product added to wishlist successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving wishlist product: " + e.getMessage());
        }
    }

    /**
     * Remove a wishlist product by its ID.
     * @param id the wishlist product ID to be deleted
     * @return response indicating success or failure
     */
    @DeleteMapping("/remove/{id}")  // Corrected path variable usage
    public ResponseEntity<String> deleteWishlistProduct(@PathVariable String id) {
        try {
            String result = wishlistProductService.deleteWishlistProduct(id);
            if (result.equals("Product not found")) {
                return ResponseEntity.status(404).body("Wishlist product not found.");
            }
            return ResponseEntity.ok("Product removed from wishlist successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error removing product from wishlist: " + e.getMessage());
        }
    }

    /**
     * Update a wishlist product by its ID.
     * @param id the wishlist product ID to be updated
     * @param updatedWishlistProduct the updated wishlist product details
     * @return the updated wishlist product
     */
    @PutMapping("/update/{id}")  // Corrected path variable usage
    public ResponseEntity<?> editWishlistProduct(@PathVariable String id, @RequestBody WishlistProductEntity updatedWishlistProduct) {
        WishlistProductEntity updatedProduct = wishlistProductService.editWishlistProduct(id, updatedWishlistProduct);
        if (updatedProduct == null) {
            return ResponseEntity.status(404).body("Wishlist product not found.");
        }
        return ResponseEntity.ok(updatedProduct);
    }
}
