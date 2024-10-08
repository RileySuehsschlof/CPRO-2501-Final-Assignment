package com.example.demo.exception;

public class AccNotFoundException extends RuntimeException {
    public AccNotFoundException(String message) {
        super(message);
    }
}
