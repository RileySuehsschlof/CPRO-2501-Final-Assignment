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
    WishlistProductService wishlistProductService;

    @Autowired
    AccountService accountService; // Service to fetch Account details

    @GetMapping
    public List<WishlistProductEntity> getAllWishlistProducts() {
        return wishlistProductService.getAllWishlistProducts();
    }

    @GetMapping("/get{id}")
    public ResponseEntity<WishlistProductEntity> getWishlistProductById(@PathVariable String id) {
        WishlistProductEntity wishlistProduct = wishlistProductService.getWishlistProductById(id);
        return ResponseEntity.ok(wishlistProduct);
    }

    @PostMapping("/addWish")  
    public String saveWishlistProduct(@RequestBody @Valid WishlistProductEntity wishlistProduct) {
        // Ensure the wishlistID corresponds to an existing account (user)
        Integer wishlistID = wishlistProduct.getWishlistID(); // Get the customer/account ID

        // Optional: You could validate that the account exists in the system
        if (accountService.getAccountById(wishlistID) == null) {
            return "Account with ID " + wishlistID + " does not exist.";
        }

        // Save the wishlist product
        return wishlistProductService.saveWishlistProduct(wishlistProduct);
    }

    @DeleteMapping("/remove{id}")
    public String deleteWishlistProduct(@PathVariable String id) {
        return wishlistProductService.deleteWishlistProduct(id);
    }

    @PutMapping("/update{id}")
    public WishlistProductEntity editWishlistProduct(@PathVariable String id, @RequestBody WishlistProductEntity updatedWishlistProduct) {
        return wishlistProductService.editWishlistProduct(id, updatedWishlistProduct);
    }
}