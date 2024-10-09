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

        if(repository.existsById(productEntity.getId())){//checks to make sure the id is unique
            throw ProductException.IdAlreadyExists(productEntity.getId());
        }
        repository.save(productEntity);
        return "Product saved: " + productEntity.getProductName();//the validation happens in ProductEntity
    }
    public ProductEntity getProductById(Integer id){
        if(id == null){

            throw ProductException.invalidProductId();
        }
        if(!repository.existsById(id)){// making sure the product exists in the database
            throw ProductException.productNotFound(id);
        }
        return repository.findById(id).get();
        }

    public ProductEntity editProduct(Integer id, ProductEntity upDatedProduct){
        ProductEntity product = getProductById(id);//gets the product to edit

        //checks each value to see if we need to update them
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
            product.setDiscount(upDatedProduct.getDiscount());
        }
        if(upDatedProduct.getQuantity() !=null){
            product.setQuantity(upDatedProduct.getQuantity());
        }
        if(upDatedProduct.getPrice() != null){
            product.setPrice(upDatedProduct.getPrice());
        }
        return repository.save(product);

    }
    public String deleteProduct(Integer id){

        if(id == null){
            throw ProductException.invalidProductId();
        }
        //checks if the product exists
        if (!repository.existsById(id))
        {

            throw ProductException.productNotFound(id);
        }
        repository.deleteById(id);
        return "succesfulfully deleted product:" +id;

    }
}
