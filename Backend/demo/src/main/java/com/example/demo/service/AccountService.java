package com.example.demo.service;


import com.example.demo.entity.Account;
import com.example.demo.repository.IRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;



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

    public Account getAccountById(int id) {
        return repository.findById(id).get();
    }
}
//@Service
//public class AccountService {
//
//    @Autowired
//    private IAccountRepository accountRepository;
//
//    public Account saveAccount(Account account) {
//        return accountRepository.save(account);
//    }
//
//    public Account findById(int id) {
//        return accountRepository.findById(id);
//    }
//
//    public List<Account> getAllAccounts() {
//        return accountRepository.getAllAccounts();
//    }
//
//}