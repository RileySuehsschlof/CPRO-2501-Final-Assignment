package com.example.demo.service;


import com.example.demo.entity.ProductEntity;
import com.example.demo.repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductEntityService {
    @Autowired
    IProductRepository repository;

    public List<ProductEntity> getAllProducts(){
        return repository.findAll();
    }

    public String saveProduct(ProductEntity productEntity){
        repository.save(productEntity);
        return "Product saved " + productEntity.getProductName();
    }
    public ProductEntity getProductById(int id){
        return repository.findById(id).get();
    }
    public ProductEntity editProduct(int id, ProductEntity upDatedProduct){
        ProductEntity product = repository.findById(id).get();

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
        if(id != null && repository.existsById(id)){

                repository.deleteById(id);
                return "succesfulfully deleted product:" +id;
        }
         return "unsuccesful";

    }
}
