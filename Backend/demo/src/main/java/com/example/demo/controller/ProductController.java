package com.example.demo.controller;

import com.example.demo.entity.ProductEntity;
import com.example.demo.service.ProductEntityService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
// import org.springframework.core.io.Resource;
// import org.springframework.http.HttpHeaders;

// import java.nio.file.Files;
// import java.nio.file.Path;
// import java.nio.file.Paths;
import java.util.List;

@RestController
public class ProductController {
    @Autowired
    ProductEntityService productEntityService;

    @GetMapping("/Products")
    public List<ProductEntity> getAllProducts() {
        return productEntityService.getAllProducts();
    }

    @GetMapping("/ProductsByCategory")
    public List<ProductEntity> getProductsByCategory(@RequestParam String category, @RequestParam int productId) {
        return productEntityService.getProductsByCategory(productId, category);
    }

    @GetMapping("/ProductsById/{id}")
    public ResponseEntity<ProductEntity> getProductById(@PathVariable Integer id) {
        ProductEntity product = productEntityService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @GetMapping({ "/ProductsById", "ProductsById/" }) // duplicate for null values
    public ResponseEntity<String> getProductByIdWithoutId() {
        return ResponseEntity.badRequest().body("Product Id is required.");
    }

    // not currently implemented in the product entity service layer
    // @GetMapping("/products/images/{imageName}")
    // public ResponseEntity<Resource> getProductImage(@PathVariable String
    // imageName) {
    // try {
    // // Define the path to the image on the server
    // Path imagePath =
    // Paths.get("src/main/resources/static/images").resolve(imageName);

    // // Load the image file as a resource
    // Resource resource = new FileSystemResource(imagePath);

    // if (!resource.exists()) {
    // return ResponseEntity.notFound().build();
    // }

    // // Determine the content type of the image file
    // String contentType = Files.probeContentType(imagePath);
    // return ResponseEntity.ok()
    // .header(HttpHeaders.CONTENT_TYPE, contentType)
    // .body(resource);

    // } catch (Exception e) {
    // return ResponseEntity.status(500).build();
    // }
    // }

    @PostMapping("/saveproduct")
    public String saveProduct(@RequestBody @Valid ProductEntity product) {
        return productEntityService.saveProduct(product);
    }

    @DeleteMapping("/deleteproduct/{id}")
    public String deleteProduct(@PathVariable int id) {
        return productEntityService.deleteProduct(id);
    }

    @DeleteMapping({ "/deleteproduct/", "/deleteproduct" }) // duplicate for null values
    public ResponseEntity<String> deleteProductWithoutId() {
        return ResponseEntity.badRequest().body("Product Id is required");
    }

    @PutMapping("/editproduct/{id}")
    public ProductEntity editProduct(@PathVariable int id, @RequestBody ProductEntity updatedProduct) {
        return productEntityService.editProduct(id, updatedProduct);
    }

    @PutMapping({ "/editproduct/", "/editproduct" }) // duplicate for null values
    public ResponseEntity<String> editProductWithoutId() {
        return ResponseEntity.badRequest().body("Product Id is required");
    }
}
