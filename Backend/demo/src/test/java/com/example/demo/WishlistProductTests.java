package com.example.demo;

import com.example.demo.entity.WishlistProductEntity;
import com.example.demo.service.WishlistProductService;
import com.example.demo.exception.WishlistProductException;
import com.example.demo.repository.IAccountRepository;
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
public class WishlistProductTests {

    @Mock
    private IWishlistProductRepository wishlistProductRepository;

    @Mock
    private IAccountRepository accountRepository;

    @InjectMocks
    private WishlistProductService wishlistProductService;
    private AccountService accountService;

    private WishlistProductEntity wishlistProduct;
    private Account account;

    @BeforeEach
    void setUp() {
        account = new Account();
        account.setBillingAddress("123 Billing Ave");
        account.setShippingAddress("123 Shipping Cres.");
        account.setCardNumber("1234123412341234");
        account.setEmail("First@Last.com");
        account.setId(1);
        account.setName("First Last");
        account.setPassword("Totally_Secure_Password123");



        wishlistProduct = new WishlistProductEntity();
        wishlistProduct.setWishlistProductID("1-1");
        wishlistProduct.setWishlistID(1);
        wishlistProduct.setProductID(1);
        wishlistProduct.setNotes("First Last would really like this product.");
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

    // deleting a wishlist product (remove from wishlist)
    @Test
    void testDeleteWishlistProduct() {
        when(wishlistProductRepository.existsById("1-1")).thenReturn(true);

        String result = wishlistProductService.deleteWishlistProduct("1-1");

        assertEquals("Successfully deleted wishlist product: 1-1", result);
        verify(wishlistProductRepository, times(1)).deleteById("1-1");
    }

    // deleting a wishlist product that does not exist (remove from wishlist)
    @Test
    void testDeleteWishlistProductNotFound() {

        when(wishlistProductRepository.existsById("1-1")).thenReturn(false);

        WishlistProductException thrown = assertThrows(WishlistProductException.class, () -> {
            wishlistProductService.deleteWishlistProduct("1-1");
        });

        assertEquals("No Wishlist Product found with ID: " + wishlistProduct.getWishlistProductID(), thrown.getMessage());
    }

    

}
