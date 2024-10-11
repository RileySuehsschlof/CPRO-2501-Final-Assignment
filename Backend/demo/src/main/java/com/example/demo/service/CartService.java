package com.example.demo.service;

import com.example.demo.entity.Cart;
import com.example.demo.exception.CartNotFoundException;
import com.example.demo.repository.ICartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    ICartRepository repository;

    public List<Cart> getAllCarts() {
        return repository.findAll();
    }

    public Optional<Cart> getCartById(Integer id) {
        return Optional.ofNullable(repository.findById(id).orElseThrow(() -> new CartNotFoundException("Cart not found with id " + id)));
    }

    public Cart saveCart(Cart cart) {
        return repository.save(cart);
    }

    public void deleteCartById(Integer id) {
        repository.deleteById(id);
    }

}
