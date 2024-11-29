package com.example.demo.repository;


import com.example.demo.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

//Interface for Account
public interface IAccountRepository extends JpaRepository<Account, Integer> {
boolean existsByEmailAndPassword(String email, String password);
boolean existsByEmail(String email);
Optional<Account> findByEmail(String email);
Optional<Account> findByEmailTest(String mail);
}
