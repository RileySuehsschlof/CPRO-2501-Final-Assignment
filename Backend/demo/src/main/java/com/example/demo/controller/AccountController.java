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
       Optional<Account> account = accountService.getAccountByEmail(email);
       return account.isPresent();
    }
    @GetMapping("/checkPassword")
    public String checkPassword(@RequestParam String email){
        Optional<Account> account = accountService.getAccountByEmail(email);
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

//    Edit a specific account by ID
//    @PutMapping("/editaccount/{accountId}")
//    public Account editAccountById(@PathVariable Integer accountId, @RequestBody Account account) {
//        return accountService.editAccountById(accountId, account);
//    }
    @PutMapping({"/editaccount/","/editaccount"})
    public ResponseEntity<String> editAccountError(){
        return ResponseEntity.badRequest().body("Account Id is missing");
    }
//    @PutMapping("/editaccount/{email}")
//    public Account editAccountById(@PathVariable String email, @RequestBody Account account){
//        return accountService.editAccountByEmail(email, account);
//    }
    @PutMapping("/editaccount/{email}")
    public ResponseEntity<Map<String, String>>editAccountById(@PathVariable String email, @RequestBody Account account) {
        accountService.editAccountByEmail(email, account);
        String newToken = jwtUtil.generateToken(account.getEmail());
        Map<String, String> response = new HashMap<>();
        response.put("token", newToken);
        return ResponseEntity.ok(response);
    }
}
