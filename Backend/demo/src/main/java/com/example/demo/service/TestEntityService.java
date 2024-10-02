package com.example.demo.service;

import com.example.demo.entity.TestEntity;
import com.example.demo.repository.IRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestEntityService {

    @Autowired
    IRepository repository;

    public List<TestEntity> getAllBlogs() {
        return repository.findAll();
    }

    public String saveBlog(TestEntity testEntity) {
        repository.save(testEntity);
        return "Blog Saved";
    }

    public TestEntity getBlogById(int id) {
        return repository.findById(id).get();
    }
}
