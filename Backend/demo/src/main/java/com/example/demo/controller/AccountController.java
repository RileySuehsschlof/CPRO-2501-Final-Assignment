package com.example.demo.controller;

import com.example.demo.DTO.LoginRequestDTO;
import com.example.demo.entity.Account;
import com.example.demo.exception.AccNotFoundException;
import com.example.demo.service.AccountService;
import com.example.demo.utility.JwtUtility;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        boolean isValid = accountService.validateLogin(loginRequest.getEmail(), loginRequest.getPassword());

        if (isValid) {
            // Generate a JWT for the user
            String token = jwtUtil.generateToken(loginRequest.getEmail());
            return ResponseEntity.ok(new JwtResponse(token)); // Return the JWT in the response
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }


    class JwtResponse {
        private String token;

        public JwtResponse(String token) {
            this.token = token;
        }

        public String getToken() {
            return token;
        }
    }


    @GetMapping("/account/{email}")
    public Optional<Account> findAccount(@PathVariable(required=true)String email){
        return accountService.getAccountByEmail(email);
    }


    //    Delete a specific account by ID
    @DeleteMapping("/deleteaccount/{accountId}")
    public ResponseEntity<String> deleteAccountById(@PathVariable Integer accountId){
       return accountService.deleteAccountById(accountId);
    }

    @DeleteMapping({"/deleteaccount","/deleteaccount/"})
    public ResponseEntity<String> deleteAccountError() {
        return ResponseEntity.badRequest().body("Account ID is missing");
    }

//    Edit a specific account by ID
    @PutMapping("/editaccount/{accountId}")
    public Account editAccountById(@PathVariable Integer accountId, @RequestBody Account account) {
        return accountService.editAccountById(accountId, account);
    }
    @PutMapping({"/editaccount/","/editaccount"})
    public ResponseEntity<String> editAccountError(){
        return ResponseEntity.badRequest().body("Account Id is missing");
    }

}
