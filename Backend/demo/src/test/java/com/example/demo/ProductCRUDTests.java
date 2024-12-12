package com.example.demo;

import com.example.demo.entity.BasicProductEntity;
import com.example.demo.entity.ProductEntity;
import com.example.demo.service.ProductEntityService;
import com.example.demo.exception.ProductException;
import com.example.demo.repository.IProductRepository;
import com.example.demo.repository.IProductImageRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class ProductCRUDTests {

    @Mock
    private IProductRepository productRepository;

    @Mock
    private IProductImageRepository productImageRepository;

    @InjectMocks
    private ProductEntityService productEntityService;

    private ProductEntity product;

    @BeforeEach
    void setUp() {

        // Using concrete class BasicProductEntity
        product = new BasicProductEntity();
        product.setId(1);
        product.setProductName("Test Product");
        product.setCategory("Test Category");
        product.setDiscount("10.0");
        product.setQuantity("100");
        product.setPrice("20.0");

        // Setting additional properties for BasicProductEntity
        ((BasicProductEntity) product).setDescription("This is a basic product description.");
    }

    // checking to see if we can save a product
    @Test
    void testSaveProduct() {
        when(productRepository.existsById(product.getId())).thenReturn(false);
        when(productRepository.save(product)).thenReturn(product);

        String result = productEntityService.saveProduct(product);

        assertEquals("Product saved: Test Product", result);
        verify(productRepository, times(1)).save(product);
    }

    // testing to see if it will allow me to create product with duplicate ids
    @Test
    void testSaveProductIdAlreadyExists() {

        when(productRepository.existsById(product.getId())).thenReturn(true);

        ProductException thrown = assertThrows(ProductException.class, () -> {
            productEntityService.saveProduct(product);
        });

        assertEquals("The Id: " + product.getId() + " is already in use", thrown.getMessage());
    }

    // getting a product by id
    @Test
    void testGetProductById() {

        when(productRepository.existsById(1)).thenReturn(true);
        when(productRepository.findById(1)).thenReturn(Optional.of(product));

        ProductEntity result = productEntityService.getProductById(1);

        assertNotNull(result);
        assertEquals("Test Product", result.getProductName());
    }

    // what happens when no product with that id exists
    @Test
    void testGetProductByIdNotFound() {

        when(productRepository.existsById(1)).thenReturn(false);

        ProductException thrown = assertThrows(ProductException.class, () -> {
            productEntityService.getProductById(1);
        });

        assertEquals("No Product found with id: " + product.getId(), thrown.getMessage());
    }

    // deleting a product
    @Test
    void testDeleteProduct() {
        when(productRepository.existsById(1)).thenReturn(true);

        String result = productEntityService.deleteProduct(1);

        assertEquals("succesfulfully deleted product:1", result);
        verify(productRepository, times(1)).deleteById(1);
    }

    // deleting a product that does not exist
    @Test
    void testDeleteProductNotFound() {

        when(productRepository.existsById(1)).thenReturn(false);

        ProductException thrown = assertThrows(ProductException.class, () -> {
            productEntityService.deleteProduct(1);
        });

        assertEquals("No Product found with id: " + product.getId(), thrown.getMessage());
    }

    // adding images to a product
    @Test
    void testSaveProductWithImages() {
        when(productRepository.existsById(product.getId())).thenReturn(false);
        when(productRepository.save(product)).thenReturn(product);

        // Test product image saving
        String result = productEntityService.saveProductWithImages(product, List.of("image1.jpg", "image2.jpg"));

        assertEquals("Product and images saved: Test Product", result);
        verify(productRepository, times(1)).save(product);
        verify(productImageRepository, times(2)).save(Mockito.any());
    }

    @Test
    void testSaveProductWithImagesIdAlreadyExists() {
        when(productRepository.existsById(product.getId())).thenReturn(true);

        ProductException thrown = assertThrows(ProductException.class, () -> {
            productEntityService.saveProductWithImages(product, List.of("image1.jpg", "image2.jpg"));
        });

        assertEquals("The Id: " + product.getId() + " is already in use", thrown.getMessage());
    }

    @Test
    void testEditProduct() {
        when(productRepository.existsById(1)).thenReturn(true);
        when(productRepository.findById(1)).thenReturn(Optional.of(product));
        when(productRepository.save(any(ProductEntity.class))).thenReturn(product);

        ProductEntity updatedProduct = mock(BasicProductEntity.class);
        when(updatedProduct.getProductName()).thenReturn("Updated Product");

        ProductEntity result = productEntityService.editProduct(1, updatedProduct);

        assertNotNull(result);
        assertEquals("Updated Product", result.getProductName());
    }
}
