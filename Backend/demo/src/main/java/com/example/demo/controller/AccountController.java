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
            return ResponseEntity.ok(new JwtResponse(token)); // Return the JWT in the response
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
    @GetMapping("/checkEmail")
    public boolean checkEmail(@RequestParam String email){
        //maybe returns an account if its email is correct
       Optional<Account> account = accountService.getAccountByEmail(email);
       //returns a boolean based on presence of account
       return account.isPresent();
    }
    @GetMapping("/checkPassword")
    public String checkPassword(@RequestParam String email){
        Optional<Account> account = accountService.getAccountByEmail(email);
        //used to return a password to compare to input
        if (account.isPresent()){
            return account.get().getPassword();
        }
        return "";
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


    @PutMapping({"/editaccount/","/editaccount"})
    public ResponseEntity<String> editAccountError(){
        return ResponseEntity.badRequest().body("Account Id is missing");
    }

    @PutMapping("/editaccount/{email}")
    public ResponseEntity<Map<String, String>>editAccountById(@PathVariable String email, @RequestBody Account account) {
        accountService.editAccountByEmail(email, account);
        //reissue a new token that corresponds to the updated email
        String newToken = jwtUtil.generateToken(account.getEmail());
        //structure response
        Map<String, String> response = new HashMap<>();
        response.put("token", newToken);
        return ResponseEntity.ok(response);
    }
}
