package com.example.demo.service;

import com.example.demo.entity.WishlistProductEntity;
import com.example.demo.exception.WishlistProductException;
import com.example.demo.repository.IWishlistProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishlistProductService {
    @Autowired
    IWishlistProductRepository repository;

    public List<WishlistProductEntity> getAllWishlistProducts() {
        return repository.findAll(); // returns an empty list if there are no wishlist products
    }

    public String saveWishlistProduct(WishlistProductEntity wishlistProductEntity) {
        if (repository.existsById(wishlistProductEntity.getWishlistProductID())) {
            throw WishlistProductException.idAlreadyExists(wishlistProductEntity.getWishlistProductID());
        }
        repository.save(wishlistProductEntity);
        return "Wishlist product saved: " + wishlistProductEntity.getProductName(); // validation happens in WishlistProductEntity
    }

    public WishlistProductEntity getWishlistProductById(String wishlistProductID) {
        if (wishlistProductID == null || wishlistProductID.isEmpty()) {
            throw WishlistProductException.invalidWishlistProductId();
        }
        if (!repository.existsById(wishlistProductID)) { // checking if the wishlist product exists in the database
            throw WishlistProductException.wishlistProductNotFound(wishlistProductID);
        }
        return repository.findById(wishlistProductID).get();
    }

    public WishlistProductEntity editWishlistProduct(String wishlistProductID, WishlistProductEntity updatedWishlistProduct) {
        WishlistProductEntity wishlistProduct = getWishlistProductById(wishlistProductID);

        if (updatedWishlistProduct.getProductName() != null) {
            wishlistProduct.setProductName(updatedWishlistProduct.getProductName());
        }
        if (updatedWishlistProduct.getImg() != null) {
            wishlistProduct.setImg(updatedWishlistProduct.getImg());
        }
        if (updatedWishlistProduct.getNotes() != null) {
            wishlistProduct.setNotes(updatedWishlistProduct.getNotes());
        }
        // Add any other fields you wish to update
        return repository.save(wishlistProduct);
    }

    public String deleteWishlistProduct(String wishlistProductID) {
        if (wishlistProductID == null || wishlistProductID.isEmpty()) {
            throw WishlistProductException.invalidWishlistProductId();
        }
        if (!repository.existsById(wishlistProductID)) {
            throw WishlistProductException.wishlistProductNotFound(wishlistProductID);
        }
        repository.deleteById(wishlistProductID);
        return "Successfully deleted wishlist product: " + wishlistProductID;
    }
}
