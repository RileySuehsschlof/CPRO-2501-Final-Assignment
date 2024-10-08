package com.example.demo.service;


import com.example.demo.entity.Account;
import com.example.demo.repository.IRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class AccountService {

    @Autowired
    IRepository repository;

    public List<Account> getAllAccounts() {
        return repository.findAll();
    }

    public String saveAccount(Account account) {
        repository.save(account);
        return "Account Saved";
    }

    public Optional<Account> getAccountById(int accountId) {
        return repository.findById(accountId);
    }
}
