package com.example.demo.repository;

import com.example.demo.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

// Interface for cart
public interface ICartRepository extends JpaRepository<Cart, Integer> {

}
