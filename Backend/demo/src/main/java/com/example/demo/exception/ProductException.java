package com.example.demo.exception;

import lombok.Getter;

@Getter
public class ProductException extends RuntimeException{

        private final String errorCode;

        public ProductException(String message, String errorCode) {
            super(message);
            this.errorCode = errorCode;
        }


    public static ProductException invalidProductId() {
            return new ProductException("Invalid Product id: . id cannot be empty.", "INVALID_PRODUCT_ID");
        }

        public static ProductException productNotFound(int id){
            return new ProductException("No Product found with id: " + id, "PRODUCT_NOT_FOUND");
        }
        // Add more static methods for other edge cases as needed
    }

