package com.example.demo.exception.customValidator;

import com.example.demo.exception.customAnnotation.ValidBigDecimal;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.math.BigDecimal;

public class BigDecimalValidator implements ConstraintValidator<ValidBigDecimal, String> {
    @Override
    public void initialize(ValidBigDecimal constraintAnnotation) {}

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        // Allow null values to be validated by @NotNull
        if (value == null || value.trim().isEmpty()) {
            return true;
        }

        try {
            new BigDecimal(value); // Try to create a BigDecimal from the string
            return true; // If successful, it's valid
        } catch (NumberFormatException e) {
            return false; // If there's an exception, it's not a valid BigDecimal
        }
    }
}
