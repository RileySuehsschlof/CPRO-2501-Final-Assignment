package com.example.demo.controller;
import com.example.demo.entity.ProductEntity;
import com.example.demo.service.ProductEntityService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ProductEntity getProductById(@PathVariable Integer id){
        return productEntityService.getProductById(id);
    }

    @GetMapping({"/ProductsById", "ProductsById/"})//duplicate for null values
    public ResponseEntity<String> getProductByIdWithoutId() {
        return ResponseEntity.badRequest().body("Product Id is required.");
    }

    @PostMapping("/saveproduct")
    public String saveProduct(@RequestBody @Valid ProductEntity product){
        return productEntityService.saveProduct(product);
    }

    @DeleteMapping("/deleteproduct/{id}")
    public String deleteProduct(@PathVariable int id){
        return productEntityService.deleteProduct(id);
    }
    @DeleteMapping({"/deleteproduct/","/deleteproduct"})//duplicate for null values
    public ResponseEntity<String> deleteProductWithoutId(){
        return ResponseEntity.badRequest().body("Product Id is required");
    }

    @PutMapping("/editproduct/{id}")
    public ProductEntity editProduct(@PathVariable int id, @RequestBody ProductEntity updatedProduct) {
        return productEntityService.editProduct(id, updatedProduct);
    }
    @PutMapping({"/editproduct/","/editproduct"})//duplicate for null values
    public ResponseEntity<String> editProductWithoutId(){
        return ResponseEntity.badRequest().body("Product Id is required");
    }
}
