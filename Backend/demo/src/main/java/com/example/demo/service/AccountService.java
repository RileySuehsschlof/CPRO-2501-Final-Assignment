package com.example.demo.service;

import com.example.demo.entity.Account;
import com.example.demo.exception.AccNotFoundException;
import com.example.demo.repository.IAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
public class AccountService {

    @Autowired
    IAccountRepository repository;

    //Log Errors
    private static final Logger logger = LoggerFactory.getLogger(AccountService.class);


//    Method to return all Accounts
    //returns an empty list if no accounts exist in database
    public List<Account> getAllAccounts() {
        return repository.findAll();
    }

    //Method to Create an account and save it to db
    public String saveAccount(Account account) {
        if (repository.existsByEmail(account.getEmail())) {
            return "Account with this email already exists.";
        }
        else {
            repository.save(account);
            return "Account saved.";
        }
    }

//    Method that passes a parameter to find an account with matching id
    public Optional<Account> getAccountById(int accountId) {
        return repository.findById(accountId);
    }

//    method to validate email using regex pattern
    private boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
        return email != null && email.matches(emailRegex);
    }

//    Method to validate card using regex pattern
    private boolean isValidCard(String card){
        String cardRegex = "^[0-9]{16}$";
        return card != null && card.matches(cardRegex);
    }

//    Method to delete an account with a specific id
    public ResponseEntity<String> deleteAccountById(Integer accountId) {
//        Make sure id exists
        if (accountId != null) {
            if (!repository.existsById(accountId)) {
//                Account does not exist
                throw new AccNotFoundException("Account not found with id: " + accountId);
            }
            repository.deleteById(accountId);
            return ResponseEntity.ok("Account deleted successfully with id: " + accountId);

        } else {
            throw new IllegalArgumentException("Account ID cannot be null");
        }
    }
    public boolean validateLogin(String email, String password) {
        // Checks if an account exists with the given email and password
        return repository.existsByEmailAndPassword(email, password);
    }


//          Method to edit an accounts fields with an id and body parameters
    public Account editAccountById(Integer accountId, Account updatedAccount) {
        // Fetch the existing account
        Account existingAccount = repository.findById(accountId)
                .orElseThrow(() -> new AccNotFoundException("Account not found"));
        logger.info("Existing account before update: {}", existingAccount);

        // Update fields only if new values are provided
        if (updatedAccount.getBillingAddress() != null) {
            existingAccount.setBillingAddress(updatedAccount.getBillingAddress());
        }
        if (updatedAccount.getCardNumber() != null) {
            if (!isValidCard(updatedAccount.getCardNumber())) {
                throw new AccNotFoundException("Card Number must be exactly 16 long and numeric");
            }
            existingAccount.setCardNumber(updatedAccount.getCardNumber());
        }
        if (updatedAccount.getShippingAddress() != null) {
            existingAccount.setShippingAddress(updatedAccount.getShippingAddress());
        }
        if (updatedAccount.getPassword() != null) {
            if (updatedAccount.getPassword().length() < 6){
                throw new AccNotFoundException("Password must be at least 6 characters long");
            }
            else {
                existingAccount.setPassword(updatedAccount.getPassword());
            }
        }
        if (updatedAccount.getEmail() != null) {
            if (!isValidEmail(updatedAccount.getEmail())) {
                throw new AccNotFoundException("Email must be in format email@email.com");
            }
            existingAccount.setEmail(updatedAccount.getEmail());
        }
        if (updatedAccount.getName() != null){
            existingAccount.setName(updatedAccount.getName());
        }

        // Save the updated account
        return repository.save(existingAccount);
    }


    public Optional<Account> getAccountByEmail(String email) {
        return repository.findByEmail(email);
    }
}
