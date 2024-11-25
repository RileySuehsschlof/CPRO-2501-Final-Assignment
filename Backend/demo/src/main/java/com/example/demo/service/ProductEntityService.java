package com.example.demo.service;

import com.example.demo.entity.ProductEntity;
import com.example.demo.entity.ProductImage;
import com.example.demo.exception.ProductException;
import com.example.demo.repository.IProductRepository;
import com.example.demo.repository.IProductImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
public class ProductEntityService {
    @Autowired
    IProductRepository repository;
    @Autowired
    IProductImageRepository imageRepository;

    public List<ProductEntity> getAllProducts() {
        return repository.findAll();// returns an empty list if there are no products
    }

    public String saveProduct(ProductEntity productEntity) {

        if (repository.existsById(productEntity.getId())) {// checks to make sure the id is unique
            throw ProductException.IdAlreadyExists(productEntity.getId());
        }
        repository.save(productEntity);
        return "Product saved: " + productEntity.getProductName();// the validation happens in ProductEntity
    }

    public ProductEntity getProductById(Integer id) {
        if (id == null) {

            throw ProductException.invalidProductId();
        }
        if (!repository.existsById(id)) {// making sure the product exists in the database
            throw ProductException.productNotFound(id);
        }
        return repository.findById(id).get();
    }

    public List<ProductEntity> getProductsByCategory(String category) {
        return repository.findAll().stream()
                .filter(product -> product.getCategory().equals(category)) // Filter by category
                .sorted(Comparator.comparing(ProductEntity::getPrice)) // Sort by price
                .collect(Collectors.toList());
    }

    public ProductEntity editProduct(Integer id, ProductEntity upDatedProduct) {
        ProductEntity product = getProductById(id);// gets the product to edit

        // checks each value to see if we need to update them
        if (upDatedProduct.getProductName() != null) {
            product.setProductName(upDatedProduct.getProductName());
        }
        if (upDatedProduct.getCategory() != null) {
            product.setCategory(upDatedProduct.getCategory());
        }
        if (upDatedProduct.getDiscount() != null) {
            product.setDiscount(upDatedProduct.getDiscount());
        }
        if (upDatedProduct.getQuantity() != null) {
            product.setQuantity(upDatedProduct.getQuantity());
        }
        if (upDatedProduct.getPrice() != null) {
            product.setPrice(upDatedProduct.getPrice());
        }
        return repository.save(product);

    }

    public String deleteProduct(Integer id) {

        if (id == null) {
            throw ProductException.invalidProductId();
        }
        // checks if the product exists
        if (!repository.existsById(id)) {

            throw ProductException.productNotFound(id);
        }
        repository.deleteById(id);
        return "succesfulfully deleted product:" + id;

    }

    // takes a product and related images
    @Transactional // ensures that if Product fails it does not go through with the rest of the
                   // saving.
    public String saveProductWithImages(ProductEntity productEntity, List<String> imageUrls) {
        if (repository.existsById(productEntity.getId())) {
            throw ProductException.IdAlreadyExists(productEntity.getId());
        }

        repository.save(productEntity);

        for (String imageUrl : imageUrls) {
            ProductImage productImage = new ProductImage();
            productImage.setImageUrl(imageUrl);
            productImage.setProduct(productEntity);
            imageRepository.save(productImage);
        }
        return "Product and images saved: " + productEntity.getProductName();
    }
}
