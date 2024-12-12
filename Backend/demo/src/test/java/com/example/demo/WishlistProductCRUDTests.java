package com.example.demo;

import com.example.demo.entity.WishlistProductEntity;
import com.example.demo.service.WishlistProductService;
import com.example.demo.exception.WishlistProductException;
import com.example.demo.repository.IWishlistProductRepository;
import com.example.demo.service.AccountService;
import com.example.demo.entity.Account;
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
    private IWishlistProductRepository wishlistProductRepository;

    @InjectMocks
    private WishlistProductService wishlistProductService;

    private WishlistProductEntity wishlistProduct;

    @BeforeEach
    void setUp() {

        wishlistProduct = new WishlistProductEntity();


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
        assertEquals("First Last would really like this product.", result.getNotes());
    }

    // what happens when no wishlist product with that id exists
    @Test
    void testGetWishlistProductByIdNotFound() {

        when(wishlistProductRepository.existsById("1-1")).thenReturn(false);

        WishlistProductException thrown = assertThrows(WishlistProductException.class, () -> {
            wishlistProductService.getWishlistProductById("1-1");
        });

        assertEquals("No Wishlist Product found with ID: " + wishlistProduct.getWishlistProductID(), thrown.getMessage());
    }

    // deleting a wishlist product
    @Test
    void testDeleteWishlistProduct() {
        when(wishlistProductRepository.existsById("1-1")).thenReturn(true);

        String result = wishlistProductService.deleteWishlistProduct("1-1");

        assertEquals("Successfully deleted wishlist product: 1-1", result);
        verify(wishlistProductRepository, times(1)).deleteById("1-1");
    }

    // deleting a product that does not exist
    @Test
    void testDeleteWishlistProductNotFound() {

        when(wishlistProductRepository.existsById("1-1")).thenReturn(false);

        WishlistProductException thrown = assertThrows(WishlistProductException.class, () -> {
            wishlistProductService.deleteWishlistProduct("1-1");
        });

        assertEquals("No Wishlist Product found with ID: " + wishlistProduct.getWishlistProductID(), thrown.getMessage());
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
