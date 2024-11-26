package com.example.demo.repository;

import com.example.demo.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ICartItemRepository extends JpaRepository<CartItem, Integer> {

    // Find all cart items for a specific cart
    List<CartItem> findByCartId(Integer cartId);
}
