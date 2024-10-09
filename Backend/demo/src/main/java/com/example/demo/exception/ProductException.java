package com.example.demo.exception;

import lombok.Getter;

@Getter
public class ProductException extends RuntimeException{

        private final String errorCode;
        //template for my error messages
        public ProductException(String message, String errorCode) {
            super(message);
            this.errorCode = errorCode;
        }


        public static ProductException invalidProductId() {
            return new ProductException("Invalid Product id: . id cannot be empty.", "INVALID_PRODUCT_ID");
        }

        public static ProductException productNotFound(Integer id){
            return new ProductException("No Product found with id: " + id, "PRODUCT_NOT_FOUND");
        }

        public static ProductException IdAlreadyExists(Integer id){
            return new ProductException("The Id: " + id + " is already in use", "ID_IN_USE");
        }


}

