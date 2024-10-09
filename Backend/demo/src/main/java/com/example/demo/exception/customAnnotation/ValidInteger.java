package com.example.demo.exception.customAnnotation;

import com.example.demo.exception.customValidator.IntegerValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = IntegerValidator.class) // Specify the validator class
@Target({ ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER, ElementType.ANNOTATION_TYPE })
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidInteger {
    String message() default "Must be a valid integer"; // Default error message

    Class<?>[] groups() default {}; // Grouping for validation

    Class<? extends Payload>[] payload() default {}; // Additional metadata
}
