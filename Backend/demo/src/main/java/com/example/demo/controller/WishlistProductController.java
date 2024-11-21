package com.example.demo.controller;

import com.example.demo.entity.WishlistProductEntity;
import com.example.demo.service.WishlistProductService;
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