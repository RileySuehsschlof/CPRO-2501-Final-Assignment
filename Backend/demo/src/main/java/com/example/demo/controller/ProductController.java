package com.example.demo.controller;


import com.example.demo.entity.ProductEntity;
import com.example.demo.service.ProductEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {
    @Autowired
    ProductEntityService productEntityService;
    @GetMapping("/Products")
    public List<ProductEntity> getAllProducts(){
        return productEntityService.getAllProducts();
    }

    @GetMapping("/ProductsById/{id}")
    public ProductEntity getProductById(@PathVariable int id){
        return productEntityService.getProductById(id);
    }

    @PostMapping("/saveproduct")
    public String saveProduct(@RequestBody ProductEntity product){
        return productEntityService.saveProduct(product);
    }

    @DeleteMapping("/deleteproduct/{id}")
    public String deleteProduct(@PathVariable int id){
        return productEntityService.deleteProduct(id);
    }

    @PutMapping("/edit/{id}")
    public ProductEntity editProduct(@PathVariable int id, @RequestBody ProductEntity updatedProduct) {
        return productEntityService.editProduct(id, updatedProduct);
    }

}
