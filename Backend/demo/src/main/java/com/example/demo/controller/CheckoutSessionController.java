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
        Stripe.apiKey = System.getenv("STRIPE_API_KEY");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "http://localhost:8080/create-checkout-session", method = RequestMethod.POST)
    public ResponseEntity<String> createCheckoutSession() {
        try {
            SessionCreateParams params = SessionCreateParams.builder()
                .setSuccessUrl("http://localhost:8080/success")
                .setCancelUrl("http://localhost:8080/cancel")
                .addLineItem(
                    SessionCreateParams.LineItem.builder()
                        .setPrice("price_1MotwRLkdIwHu7ixYcPLm5uZ")
                        .setQuantity(2L)
                        .build()
                )
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .build();
            Session session = Session.create(params);
            return ResponseEntity.ok(session.getUrl());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating checkout session: " + e.getMessage());
        }
    }
}
