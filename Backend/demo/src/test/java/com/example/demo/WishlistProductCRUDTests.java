package com.example.demo;

import com.example.demo.entity.BasicProductEntity;
import com.example.demo.entity.ProductEntity;
import com.example.demo.entity.Account;
import com.example.demo.entity.WishlistProductEntity;
import com.example.demo.service.ProductEntityService;
import com.example.demo.service.WishlistProductService;
import com.example.demo.exception.WishlistProductException;
import com.example.demo.repository.IProductRepository;
import com.example.demo.repository.IProductImageRepository;
import com.example.demo.repository.IWishlistProductRepository;
import com.example.demo.repository.IAccountRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class WishlistProductCRUDTests {

    @Mock
    private IProductRepository productRepository;
    @Mock
    private IWishlistProductRepository wishlistProductRepository;
    @Mock
    private IAccountRepository accountRepository;
    @Mock
    private IProductImageRepository productImageRepository;

    @InjectMocks
    private ProductEntityService productEntityService;
    private WishlistProductService wishlistProductService;

    private ProductEntity product;
    private Account account;
    private WishlistProductEntity wishlistProduct;

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


        account.setBillingAddress("123 Test Ave.");
        ((Account) account).setCardNumber("1234123412341234");
        account.setEmail("User@email.com");
        account.setId(1);
        account.setName("First Last");
        account.setPassword("SecurePassword");
        account.setShippingAddress("123 Shipping Cres.");

        wishlistProduct.setWishlistProductID("1-1");
        wishlistProduct.setWishlistID(1);
        wishlistProduct.setProductID(1);
        wishlistProduct.setNotes("First Last would really like this product.");
    }

    // checking to see if we can save a product
    @Test
    void testSaveWishlistProduct() {
        when(wishlistProductRepository.existsById(wishlistProduct.getWishlistProductID())).thenReturn(false);
        when(wishlistProductRepository.save(wishlistProduct)).thenReturn(wishlistProduct);

        String result = wishlistProductService.saveWishlistProduct(wishlistProduct);

        assertEquals("Wishlist product saved: First Last saved ", result);
        verify(wishlistProductRepository, times(1)).save(wishlistProduct);
    }

    // testing to see if it will allow me to save a product to the same wishlist twice
    @Test
    void testSaveWishlistProductIdAlreadyExists() {

        when(wishlistProductRepository.existsById(wishlistProduct.getWishlistProductID())).thenReturn(true);

        WishlistProductException thrown = assertThrows(WishlistProductException.class, () -> {
            wishlistProductService.saveWishlistProduct(wishlistProduct);
        });

        assertEquals("The Wishlist Product Id: " + wishlistProduct.getWishlistProductID() + " is already in use", thrown.getMessage());
    }

    // getting a wishlist product by wishlist product id
    @Test
    void testGetWishlistProductById() {

        when(wishlistProductRepository.existsById("1-1")).thenReturn(true);
        when(wishlistProductRepository.findById("1-1")).thenReturn(Optional.of(wishlistProduct));

        WishlistProductEntity result = wishlistProductService.getWishlistProductById("1-1");

        assertNotNull(result);
        assertEquals("Test Product", result.getNotes());
    }

    // what happens when no wishlist product with that id exists
    @Test
    void testGetWishlistProductByIdNotFound() {

        when(wishlistProductRepository.existsById("1-1")).thenReturn(false);

        WishlistProductException thrown = assertThrows(WishlistProductException.class, () -> {
            wishlistProductService.getWishlistProductById("1-1");
        });

        assertEquals("No Wishlist Product found with WP id: " + wishlistProduct.getWishlistProductID(), thrown.getMessage());
    }

    // deleting a wishlist product
    @Test
    void testDeleteWishlistProduct() {
        when(wishlistProductRepository.existsById("1-1")).thenReturn(true);

        String result = wishlistProductService.deleteWishlistProduct("1-1");

        assertEquals("successfully deleted wishlist product:1-1", result);
        verify(wishlistProductRepository, times(1)).deleteById("1-1");
    }

    // deleting a product that does not exist
    @Test
    void testDeleteProductNotFound() {

        when(wishlistProductRepository.existsById("1-1")).thenReturn(false);

        WishlistProductException thrown = assertThrows(WishlistProductException.class, () -> {
            wishlistProductService.deleteWishlistProduct("1-1");
        });

        assertEquals("No Product found with id: " + wishlistProduct.getWishlistProductID(), thrown.getMessage());
    }

    


    @Test
    void testEditWishlistProduct() {
        when(wishlistProductRepository.existsById("1-1")).thenReturn(true);
        when(wishlistProductRepository.findById("1-1")).thenReturn(Optional.of(wishlistProduct));
        when(wishlistProductRepository.save(any(WishlistProductEntity.class))).thenReturn(wishlistProduct);

        WishlistProductEntity updatedWishlistProduct = mock(WishlistProductEntity.class);
        when(updatedWishlistProduct.getNotes()).thenReturn("Updated Notes");

        WishlistProductEntity result = wishlistProductService.editWishlistProduct("1-1", updatedWishlistProduct);

        assertNotNull(result);
        assertEquals("Updated Product", result);
    }
}
