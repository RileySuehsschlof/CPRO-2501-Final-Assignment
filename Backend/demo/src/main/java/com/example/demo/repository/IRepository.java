package com.example.demo.repository;

import com.example.demo.entity.TestEntity;
import org.springframework.data.jpa.repository.JpaRepository;



//import com.example.demo.entity.TestEntity;
//import org.springframework.data.jpa.repository.JpaRepository;

public interface IRepository extends JpaRepository<TestEntity, Integer> {

}