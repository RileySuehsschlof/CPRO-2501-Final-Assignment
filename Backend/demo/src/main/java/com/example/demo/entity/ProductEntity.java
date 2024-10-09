package com.example.demo.entity;

import com.example.demo.exception.customAnnotation.ValidBigDecimal;
import com.example.demo.exception.customAnnotation.ValidInteger;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductEntity {
    //primairy key
    @Id
    @NotNull(message = "Must have a Id")
    private Integer id;

    @Lob//for images
    private byte[] img; // Store image as byte array instead of Image

    @NotNull(message = "Must have a Product Name")
    private String productName;

    @ValidInteger//this ensures that it can be converted to an integer
    @NotNull(message = "Must have a quantity")
    private String quantity;//is a string so my validation can work

    @ValidBigDecimal(message = "Must be a valid decimal")//this ensures it can be converted to a BigDecimal
    @NotNull(message = "Must have a Price")
    private String price;

    @ValidBigDecimal(message = "Must be a valid decimal")
    @NotNull(message = "Must have a Discount")
    private String discount;

    @NotNull(message = "Must have a Category")
    private String category;
}
