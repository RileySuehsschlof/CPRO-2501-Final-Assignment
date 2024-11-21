package com.example.demo.exception;

// Exception for when cart is not found
public class CartNotFoundException extends RuntimeException {
    public CartNotFoundException(String message) {
        super(message);
    }
}
