package com.example.demo.service;

import com.example.demo.entity.Cart;
import com.example.demo.entity.CartItem;
import com.example.demo.entity.ProductEntity;
import com.example.demo.exception.CartNotFoundException;
import com.example.demo.repository.ICartRepository;
import com.example.demo.repository.IProductRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    ICartRepository cartRepository;

    @Autowired
    private IProductRepository productRepository;

    // Method that gets all carts
    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    // Method that gets a cart by its ID
    public Optional<Cart> getCartById(Integer id) {
        return Optional.ofNullable(cartRepository.findById(id).orElseThrow(() -> new CartNotFoundException("Cart not found with id " + id)));
    }

    // Method that saves a cart to the database
    public Cart saveCart(Cart cart) {
        return cartRepository.save(cart);
    }

    // Method that deletes a cart by its ID
    public void deleteCartById(Integer id) {
        cartRepository.deleteById(id);
    }

    @Transactional
    public void addItemToCart(Integer cartId, Integer productId, Integer quantity) {
        // Find the cart by its ID
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new IllegalArgumentException("Cart not found with id " + cartId));

        // Find the product by its ID
        ProductEntity product = productRepository.findById(productId).orElse(null);

        if (product == null) {
            System.out.println("Product not found with id " + productId);
            return;
        }

        // Check if the product is already in the cart
        CartItem existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst()
                .orElse(null);

        if (existingItem != null) {
            // If product is already in cart, update the quantity
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
        } else {
            // If product is not in cart, create a new CartItem and add it
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduct(product);
            newItem.setQuantity(quantity);
            cart.getItems().add(newItem);
        }

        // Save the updated cart
        cartRepository.save(cart);
    }

    @Transactional
    public void removeItemFromCart(Integer cartId, Integer itemId) {
        // Find the cart by its ID, throw exception if not found
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new IllegalArgumentException("Cart not found with id " + cartId));

        // Find the CartItem by its ID in the cart, throw exception if not found
        CartItem itemToRemove = cart.getItems().stream()
                .filter(item -> item.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Cart item not found with id " + itemId));

        // Remove the item from the cart
        cart.getItems().remove(itemToRemove);

        // Save the updated cart
        cartRepository.save(cart);
    }

}
