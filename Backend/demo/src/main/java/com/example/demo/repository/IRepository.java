package com.example.demo.repository;


import com.example.demo.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.List;

public interface IRepository extends JpaRepository<Account, Integer> {

}
