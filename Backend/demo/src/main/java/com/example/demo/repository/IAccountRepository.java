package com.example.demo.repository;


import com.example.demo.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

//Interface for Account
public interface IAccountRepository extends JpaRepository<Account, Integer> {

}
