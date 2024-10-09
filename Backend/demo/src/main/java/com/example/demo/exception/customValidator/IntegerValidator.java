package com.example.demo.exception.customValidator;

import com.example.demo.exception.customAnnotation.ValidInteger;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class IntegerValidator implements ConstraintValidator<ValidInteger, String> {

    @Override
    public void initialize(ValidInteger constraintAnnotation) {
        // Initialization logic, if needed
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return true; // Allow null values if you are using @NotNull elsewhere
        }
        try {
            Integer.parseInt(value);
            return true; // Valid integer
        } catch (NumberFormatException e) {
            return false; // Invalid integer
        }
    }
}