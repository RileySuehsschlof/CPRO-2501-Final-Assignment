package com.example.demo.controller;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CheckoutSessionController {

    // Set your secret key (use your actual key in production)
    static {
        Stripe.apiKey = "sk_test_51QOtECKbLtLt8gtE6J6hpb3flSjtREEbF049R0e8xdyALYAOe3yIDvfkEEXloWcCyKaU4PRBJRrYkafq69ye1uwa00vCL76hFg";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/create-checkout-session", method = RequestMethod.POST)
    public ResponseEntity<String> createCheckoutSession() {
        try {
            SessionCreateParams params = SessionCreateParams.builder()
                .setSuccessUrl("http://localhost:3000/success")
                .setCancelUrl("http://localhost:3000/cancel")
                .addLineItem(
                    SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(
                            SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("cad")
                                .setUnitAmount(1500L) // Amount in cents ($15.00) - set dynamically
                                .setProductData(
                                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName("Cart total")
                                        .build()
                                )
                                .build()
                        )
                        .build()
                )
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .build();
            Session session = Session.create(params);
            return ResponseEntity.ok(session.getId());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error creating checkout session: " + e.getMessage());
        }
    }
}
