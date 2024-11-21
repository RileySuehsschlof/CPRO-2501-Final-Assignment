package com.example.demo.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
//A simple product that only has the basic data
public class BasicProductEntity extends ProductEntity{
//    @Id
//    private Integer id;
}
