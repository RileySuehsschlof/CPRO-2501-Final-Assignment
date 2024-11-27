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

    @Autowired
    AccountService accountService; // Injecting the AccountService to check if Account exists

    public List<WishlistProductEntity> getAllWishlistProducts() {
        return repository.findAll(); // returns an empty list if there are no wishlist products
    }

    public String saveWishlistProduct(WishlistProductEntity wishlistProductEntity) {
        // Validate if the wishlistID (accountID) exists in the database
        Integer wishlistID = wishlistProductEntity.getWishlistID();
        // Ensure the account exists by calling AccountService
        if (accountService.getAccountById(wishlistID).isEmpty()) {
            throw WishlistProductException.wishlistProductNotFound(wishlistProductEntity.getWishlistProductID());
        }

        // Check if the wishlistProductID already exists in the repository
        if (repository.existsById(wishlistProductEntity.getWishlistProductID())) {
            throw WishlistProductException.idAlreadyExists(wishlistProductEntity.getWishlistProductID());
        }
        // Save the wishlist product in the repository
        repository.save(wishlistProductEntity);
        return "Wishlist product saved"; // We no longer return product name
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

        // Check if the updated wishlist product has a valid wishlistID (accountID)
        if (updatedWishlistProduct.getWishlistID() != null) {
            Integer wishlistID = updatedWishlistProduct.getWishlistID();
            // Validate if the account (wishlistID) exists
            if (accountService.getAccountById(wishlistID).isEmpty()) {
                throw WishlistProductException.wishlistProductNotFound(updatedWishlistProduct.getWishlistProductID());
            }
            wishlistProduct.setWishlistID(wishlistID);
        }

        // Update other fields of the wishlist product if provided
        if (updatedWishlistProduct.getProductID() != null) {
            wishlistProduct.setProductID(updatedWishlistProduct.getProductID());
        }
        if (updatedWishlistProduct.getNotes() != null) {
            wishlistProduct.setNotes(updatedWishlistProduct.getNotes());
        }

        // Save the updated wishlist product
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

    /**
     * Get the wishlist products for a specific user by wishlistID.
     * @param wishlistID the wishlist ID of the user
     * @return list of wishlist products
     */
    public List<WishlistProductEntity> getWishlistByUserId(Integer wishlistID) {
        // Validate if the account exists
        if (accountService.getAccountById(wishlistID).isEmpty()) {
            throw WishlistProductException.accountNotFound(wishlistID);  // Use the new exception method
        }
    
        // Retrieve all products for the given wishlistID
        List<WishlistProductEntity> wishlistProducts = repository.findByWishlistID(wishlistID);
    
        if (wishlistProducts.isEmpty()) {
            throw WishlistProductException.noProductsInWishlist(wishlistID);  // Use the new exception method
        }
    
        return wishlistProducts;
    }
    
    
}
