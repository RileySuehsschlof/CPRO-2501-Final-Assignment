package com.example.demo.service;


import com.example.demo.entity.ProductEntity;
import com.example.demo.repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductEntityService {
    @Autowired
    IProductRepository repository;

    public List<ProductEntity> getAllProducts(){
        return repository.findAll();
    }

    public String saveProduct(ProductEntity productEntity){
        repository.save(productEntity);
        return "Product saved " + productEntity.getProductName();
    }
    public ProductEntity getProductById(int id){
        return repository.findById(id).get();
    }
}
