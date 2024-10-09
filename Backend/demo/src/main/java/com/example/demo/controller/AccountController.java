package com.example.demo.controller;

import com.example.demo.entity.Account;
import com.example.demo.exception.AccNotFoundException;
import com.example.demo.service.AccountService;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/")
public class AccountController {

    @Autowired
    private AccountService accountService;

    // Create a new account
    @PostMapping("/createaccount")
    public String createAccount(@RequestBody @Valid Account account) {
        return accountService.saveAccount(account);
    }

    // Retrieve all accounts
    @GetMapping({"/accounts","/accounts/"})
    public List<Account> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    // Retrieve a specific account by ID
    //Throw a custom error if account doesn't exist in the database
    @GetMapping({"/account/{accountId}", "/account", "/account/"})
    public ResponseEntity<?> findAccount(@PathVariable(required = false) Integer accountId) {
        if (accountId != null) {
            // Handle the case where accountId is present
            return accountService.getAccountById(accountId)
                    .map(ResponseEntity::ok)
                    .orElseThrow(() -> new AccNotFoundException("Account not found with id: " + accountId));
        } else {
            // Handle the case where accountId is missing
            return ResponseEntity.badRequest().body("Account ID is missing");
        }
    }
//    @GetMapping({"/account","/account/"})
//    public ResponseEntity<String> handleMissingAccountId() {
//        return ResponseEntity.badRequest().body("Account ID is missing");
//    }

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
