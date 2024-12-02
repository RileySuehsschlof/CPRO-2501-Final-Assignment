package com.example.demo.controller;

import com.example.demo.entity.WishlistProductEntity;
import com.example.demo.service.WishlistProductService;
import com.example.demo.service.AccountService;
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
        try {
            List<WishlistProductEntity> wishlistProducts = wishlistProductService.getAllWishlistProducts();
            return ResponseEntity.ok(wishlistProducts);
        } catch (Exception e) {
            // Log the error for debugging
            System.err.println("Error fetching all wishlist products: " + e.getMessage());
            return ResponseEntity.status(500).body(null);
        }
    }

    /**
     * Get wishlist products by user ID (wishlistID).
     * @param wishlistID the user ID (account ID)
     * @return list of wishlist products for the specified user
     */
    @GetMapping("/wishlist/{wishlistID}")
    public ResponseEntity<List<WishlistProductEntity>> getWishlistByUserId(@PathVariable Integer wishlistID) {
        try {
            // Fetch wishlist products for the given user ID
            List<WishlistProductEntity> wishlistProducts = wishlistProductService.getWishlistByUserId(wishlistID);

            // If no products are found, return an empty list (valid response)
            if (wishlistProducts == null || wishlistProducts.isEmpty()) {
                return ResponseEntity.ok(wishlistProducts); // Empty list is a valid response
            }

            return ResponseEntity.ok(wishlistProducts);
        } catch (Exception e) {
            // Log the exception for debugging purposes
            System.err.println("Error fetching wishlist for userID " + wishlistID + ": " + e.getMessage());
            return ResponseEntity.status(500).body(null);
        }
    }

    /**
     * Get a specific wishlist product by its ID.
     * @param id the wishlist product ID
     * @return the wishlist product
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getWishlistProductById(@PathVariable String id) {
        try {
            WishlistProductEntity wishlistProduct = wishlistProductService.getWishlistProductById(id);
            if (wishlistProduct == null) {
                return ResponseEntity.status(404).body("Wishlist product not found.");
            }
            return ResponseEntity.ok(wishlistProduct);
        } catch (Exception e) {
            // Log any exception that might occur
            System.err.println("Error fetching wishlist product with ID " + id + ": " + e.getMessage());
            return ResponseEntity.status(500).body("Error fetching wishlist product.");
        }
    }

    /**
     * Add a new wishlist product.
     * @param wishlistProduct the wishlist product entity to be added
     * @return response indicating success or failure
     */
    @PostMapping("/addWish")
    public ResponseEntity<String> saveWishlistProduct(@RequestBody WishlistProductEntity wishlistProduct) {
        try {
            Integer wishlistID = wishlistProduct.getWishlistID(); // Get the customer/account ID

            // Check if the account exists
            if (accountService.getAccountById(wishlistID) == null) {
                return ResponseEntity.status(400).body("Account with ID " + wishlistID + " does not exist.");
            }

            if (wishlistProduct.getWishlistProductID() == null || !wishlistProduct.getWishlistProductID().matches("\\d+-\\d+")) {
                return ResponseEntity.status(400).body("Invalid Wishlist Product ID format.");
            }

            // Save the wishlist product
            wishlistProductService.saveWishlistProduct(wishlistProduct);
            return ResponseEntity.status(201).body("Product added to wishlist successfully.");
        } catch (Exception e) {
            // Log the error for debugging
            System.err.println("Error saving wishlist product: " + e.getMessage());
            return ResponseEntity.status(500).body("Error saving wishlist product.");
        }
    }

    /**
     * Remove a wishlist product by its ID.
     * @param id the wishlist product ID to be deleted
     * @return response indicating success or failure
     */
    @DeleteMapping("/remove/{id}")
    public ResponseEntity<String> deleteWishlistProduct(@PathVariable String id) {
        try {
            String result = wishlistProductService.deleteWishlistProduct(id);
            if (result.equals("Product not found")) {
                return ResponseEntity.status(404).body("Wishlist product not found.");
            }
            return ResponseEntity.ok("Product removed from wishlist successfully.");
        } catch (Exception e) {
            // Log any exceptions that occur
            System.err.println("Error removing product from wishlist with ID " + id + ": " + e.getMessage());
            return ResponseEntity.status(500).body("Error removing product from wishlist.");
        }
    }

    /**
     * Update a wishlist product by its ID.
     * @param id the wishlist product ID to be updated
     * @param updatedWishlistProduct the updated wishlist product details
     * @return the updated wishlist product
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<?> editWishlistProduct(@PathVariable String id, @RequestBody WishlistProductEntity updatedWishlistProduct) {
        try {
            WishlistProductEntity updatedProduct = wishlistProductService.editWishlistProduct(id, updatedWishlistProduct);
            if (updatedProduct == null) {
                return ResponseEntity.status(404).body("Wishlist product not found.");
            }
            return ResponseEntity.ok(updatedProduct);
        } catch (Exception e) {
            // Log the exception for debugging
            System.err.println("Error updating wishlist product with ID " + id + ": " + e.getMessage());
            return ResponseEntity.status(500).body("Error updating wishlist product.");
        }
    }
}
