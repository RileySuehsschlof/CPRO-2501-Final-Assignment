package com.example.demo.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
@DiscriminatorValue("BasicProduct") // Set the discriminator value for this subclass
// A simple product that only has the basic data
public class BasicProductEntity extends ProductEntity {

    private String description;
}
