package com.example.demo.controller;

import com.example.demo.DTO.LoginRequestDTO;
import com.example.demo.entity.Account;
import com.example.demo.service.AccountService;
import com.example.demo.utility.JwtUtility;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/")
public class AccountController {

    @Autowired
    private AccountService accountService;
@Autowired
    private final JwtUtility jwtUtil;

    public AccountController(JwtUtility jwtUtil) {
        this.jwtUtil = jwtUtil;
    }


    // Create a new account
    @PostMapping("/createaccount")
    public String createAccount(@RequestBody @Valid Account account) {
        return accountService.saveAccount(account);
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO loginRequest) {
        //checks if email and password from the request are valid
        boolean isValid = accountService.validateLogin(loginRequest.getEmail(), loginRequest.getPassword());

        if (isValid) {
            // Generate a JWT for the user
            String token = jwtUtil.generateToken(loginRequest.getEmail());

            // Retrieve the Account object by email
            Optional<Account> account = accountService.getAccountByEmail(loginRequest.getEmail());
            
            if (account.isPresent()) {
                Integer userID = account.get().getId(); // Get the userID (Account ID)
                // Return the JWT and userID in the response
                return ResponseEntity.ok(new JwtResponse(token, userID));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Account not found");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
    // Check if the email already exists in the system
    @GetMapping("/checkEmail")
    public boolean checkEmail(@RequestParam String email) {
        Optional<Account> account = accountService.getAccountByEmail(email);
        return account.isPresent();
    }
    // Get the password for a specific email
    @GetMapping("/checkPassword")
    public String checkPassword(@RequestParam String email) {
        Optional<Account> account = accountService.getAccountByEmail(email);
        if (account.isPresent()) {
            return account.get().getPassword();
        }
        return "";
    }

    // Endpoint to retrieve an account by email
    @GetMapping("/account/{email}")
    public Optional<Account> findAccount(@PathVariable String email) {
        return accountService.getAccountByEmail(email);
    }

    // Delete a specific account by ID
    @DeleteMapping("/deleteaccount/{accountId}")
    public ResponseEntity<String> deleteAccountById(@PathVariable Integer accountId) {
        return accountService.deleteAccountById(accountId);
    }

    // Handle error when account ID is missing in the delete request
    @DeleteMapping({"/deleteaccount", "/deleteaccount/"})
    public ResponseEntity<String> deleteAccountError() {
        return ResponseEntity.badRequest().body("Account ID is missing");
    }

    // Handle error when account ID is missing in the edit request
    @PutMapping({"/editaccount/", "/editaccount"})
    public ResponseEntity<String> editAccountError() {
        return ResponseEntity.badRequest().body("Account Id is missing");
    }

    // Edit an account by email
    @PutMapping("/editaccount/{email}")
    public ResponseEntity<Map<String, String>> editAccountById(@PathVariable String email, @RequestBody Account account) {
        accountService.editAccountByEmail(email, account);
        //reissue a new token that corresponds to the updated email
        String newToken = jwtUtil.generateToken(account.getEmail());
        Map<String, String> response = new HashMap<>();
        response.put("token", newToken);
        return ResponseEntity.ok(response);
    }

    // JWT Response class to return both token and userID
    class JwtResponse {
        private String token;
        private Integer userID;

        public JwtResponse(String token, Integer userID) {
            this.token = token;
            this.userID = userID;
        }

        public String getToken() {
            return token;
        }

        public Integer getUserID() {
            return userID;
        }
    }
}
