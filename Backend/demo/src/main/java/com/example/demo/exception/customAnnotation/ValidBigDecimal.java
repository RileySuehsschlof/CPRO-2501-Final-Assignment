package com.example.demo.exception.customAnnotation;

import com.example.demo.exception.customValidator.BigDecimalValidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = BigDecimalValidator.class) // Specify the validator class
@Target({ ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER, ElementType.ANNOTATION_TYPE }) // Where the annotation can be applied
@Retention(RetentionPolicy.RUNTIME) // The annotation will be available at runtime
public @interface ValidBigDecimal {
    String message() default "Must be a valid BigDecimal"; // Default error message

    Class<?>[] groups() default {}; // Grouping for validation

    Class<? extends Payload>[] payload() default {}; // Additional metadata
}
