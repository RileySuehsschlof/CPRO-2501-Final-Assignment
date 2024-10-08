package com.example.demo.controller;

import com.example.demo.entity.Account;
import com.example.demo.exception.AccNotFoundException;
import com.example.demo.service.AccountService;
import jakarta.validation.Valid;
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
    @GetMapping("/accounts")
    public List<Account> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    // Retrieve a specific account by ID
    //Throw a custom error if account doesnt exist in the database
    @GetMapping("/account/{accountId}")
    public Account findAccountById(@PathVariable Integer accountId) {
        return accountService.getAccountById(accountId)
                .orElseThrow(() -> new AccNotFoundException("Account not found with id: " + accountId));
    }

    @DeleteMapping("/delete/{accountId}")
    public ResponseEntity<String> deleteAccountById(@PathVariable Integer accountId){
       return accountService.deleteAccountById(accountId);
    }

    @PutMapping("/edit/{accountId}")
    public Account editAccountById(@PathVariable Integer accountId, @RequestBody Account account) {
        return accountService.editAccountById(accountId, account);
    }

}
