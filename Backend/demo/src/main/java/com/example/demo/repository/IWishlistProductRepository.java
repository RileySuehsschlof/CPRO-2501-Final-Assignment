package com.example.demo.repository;

import com.example.demo.entity.WishlistProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IWishlistProductRepository extends JpaRepository<WishlistProductEntity, String> {

    // Method to find wishlist products by the user ID (wishlistID)
    List<WishlistProductEntity> findByWishlistID(Integer wishlistID);

}
