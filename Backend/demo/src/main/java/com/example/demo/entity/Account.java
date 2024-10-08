package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Account {

//    @NotNull and @NotBlank are used to make sure fields are filled in
    @Id
    @NotNull(message = "Id is required")
    private Integer id;

    @Email(message = "Email must be in format email@email.com")
    @NotBlank(message="Email is required")
    private String email;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Shipping Address is required")
    private String shippingAddress;

    @NotBlank(message = "Billing Address is required")
    private String billingAddress;

    @NotNull(message = "Card Number is required")
    @Pattern(regexp = "^[0-9]{16}$", message = "Card Number must be exactly 16 digits and numeric")
//    Pattern sets a regexp pattern for what an input should look like
    private String cardNumber;
}
