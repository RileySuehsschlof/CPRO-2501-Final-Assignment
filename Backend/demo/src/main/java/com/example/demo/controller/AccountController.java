package com.example.demo.controller;

import com.example.demo.entity.Account;
import com.example.demo.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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
    @GetMapping("account/{accountId}")
    public Account getAccountById(@PathVariable int accountId) {
        return accountService.getAccountById(accountId);
    }
}

