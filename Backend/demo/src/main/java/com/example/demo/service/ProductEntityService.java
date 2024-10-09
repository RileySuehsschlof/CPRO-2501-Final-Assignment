package com.example.demo.service;


import com.example.demo.entity.ProductEntity;
import com.example.demo.exception.ProductException;
import com.example.demo.repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductEntityService {
    @Autowired
    IProductRepository repository;

    public List<ProductEntity> getAllProducts(){
        return repository.findAll();//returns an empty list if there are no products
    }

    public String saveProduct(ProductEntity productEntity){
        repository.save(productEntity);
        return "Product saved " + productEntity.getProductName();//the validation happens in ProductEntity
    }
    public ProductEntity getProductById(Integer id){
        System.out.println("hey what is my issue"+id);
        if(id == null){

            throw ProductException.invalidProductId();
        }
        if(!repository.existsById(id)){// making sure the product exists in the database
            throw ProductException.productNotFound(id);
        }
        return repository.findById(id).get();
        }

    public ProductEntity editProduct(int id, ProductEntity upDatedProduct){
        ProductEntity product = getProductById(id);

        if(upDatedProduct.getProductName() !=null){
            product.setProductName(upDatedProduct.getProductName());
        }
        if(upDatedProduct.getImg() !=null){
            product.setImg(upDatedProduct.getImg());
        }
        if(upDatedProduct.getCategory() !=null){
            product.setCategory(upDatedProduct.getCategory());
        }
        if(upDatedProduct.getDiscount() !=null){
            product.setDiscount(product.getDiscount());
        }
        if(upDatedProduct.getQuantity() !=null){
            product.setQuantity(product.getQuantity());
        }
        return repository.save(product);

    }
    public String deleteProduct(Integer id){
        if(id == null){
            throw ProductException.invalidProductId();
        }
        if (!repository.existsById(id))
        {
//            throw new AccNotFoundException("Hi");
            throw ProductException.productNotFound(id);
        }
        repository.deleteById(id);
        return "succesfulfully deleted product:" +id;

    }
}
