package com.example.demo.exception.customValidator;

import com.example.demo.exception.customAnnotation.ValidBigDecimal;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.math.BigDecimal;

public class BigDecimalValidator implements ConstraintValidator<ValidBigDecimal, BigDecimal> {
    @Override
    public void initialize(ValidBigDecimal constraintAnnotation) {
    }

    @Override
    public boolean isValid(BigDecimal value, ConstraintValidatorContext context) {
        // Allow null values to be validated by @NotNull
        if (value == null) {
            return true;
        }

        // Check if the value is a valid BigDecimal
        return value instanceof BigDecimal;
    }
}
