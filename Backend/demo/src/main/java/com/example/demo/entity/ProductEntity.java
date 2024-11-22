package com.example.demo.entity;

import com.example.demo.exception.customAnnotation.ValidBigDecimal;
import com.example.demo.exception.customAnnotation.ValidInteger;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE) // Or another inheritance strategy
@DiscriminatorColumn(name = "product_type", discriminatorType = DiscriminatorType.STRING) // Optional, for
                                                                                          // distinguishing between
                                                                                          // different product types
public abstract class ProductEntity {
    @Id
    @NotNull(message = "Must have an Id")
    private Integer id;

    @Lob
    private byte[] img;

    @NotNull(message = "Must have a Product Name")
    private String productName;

    @ValidInteger
    @NotNull(message = "Must have a quantity")
    private String quantity;

    @ValidBigDecimal(message = "Must be a valid decimal")
    @NotNull(message = "Must have a Price")
    private String price;

    @ValidBigDecimal(message = "Must be a valid decimal")
    @NotNull(message = "Must have a Discount")
    private String discount;

    @NotNull(message = "Must have a Category")
    private String category;

    // @Column(name = "product_type")
    // private String productType;
}
