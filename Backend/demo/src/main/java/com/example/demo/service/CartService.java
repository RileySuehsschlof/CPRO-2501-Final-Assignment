package com.example.demo.service;

import com.example.demo.entity.Cart;
import com.example.demo.entity.CartItem;
import com.example.demo.entity.ProductEntity;
import com.example.demo.repository.ICartRepository;
import com.example.demo.repository.ICartItemRepository;
import com.example.demo.repository.IProductRepository;
import com.example.demo.exception.CartNotFoundException;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    @Autowired
    ICartRepository cartRepository;

    @Autowired
    private ICartItemRepository cartItemRepository;

    @Autowired
    private IProductRepository productRepository;

    // Create a new cart for a user by Email
    public Cart createCart(String userEmail) {
        Cart cart = new Cart();
        cart.setUserEmail(userEmail);
        return cartRepository.save(cart);
    }

    // Add an item to the cart by ID
    public CartItem addItemToCart(Integer cartId, Integer productId, Integer quantity) {
        // Find the cart by ID
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new CartNotFoundException("Cart not found"));

        // Find the product by ID
        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Create a new CartItem and set properties
        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);

        return cartItemRepository.save(cartItem);
    }

    // Calculate the total price of items in the cart
    public BigDecimal getTotalPrice(Integer cartId) {
        List<CartItem> items = cartItemRepository.findByCartId(cartId);
        return items.stream()
                .map(CartItem::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    // Get a cart by user email
    public Cart getCartByEmail(String userEmail) {
        return cartRepository.findByUserEmail(userEmail);
    }

    // Add an item to the cart by user email
    public CartItem addItemToCartByEmail(String userEmail, Integer productId, Integer quantity) {
        // Find the cart by ID
        Cart cart = cartRepository.findByUserEmail(userEmail);

        // Find the product by ID
        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Create a new CartItem and set properties
        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);

        return cartItemRepository.save(cartItem);
    }

    public void removeCartItemById(Integer cartItemId) {
        cartItemRepository.findById(cartItemId)
                .ifPresentOrElse(
                    cartItemRepository::delete,
                    () -> { throw new RuntimeException("Cart item not found for ID: " + cartItemId); }
                );
    }

}
