package com.example.demo.repository;

import com.example.demo.entity.WishlistProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IWishlistProductRepository extends JpaRepository<WishlistProductEntity, String> {
}
