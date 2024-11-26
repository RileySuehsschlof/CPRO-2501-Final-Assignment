package com.example.demo.repository;

import com.example.demo.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ICartRepository extends JpaRepository<Cart, Integer> {

    // Find a cart by user email
    Cart findByUserEmail(String userEmail);
}
