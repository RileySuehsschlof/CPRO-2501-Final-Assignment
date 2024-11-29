package com.example.demo.DTO;

import jakarta.validation.constraints.Min;

public class AddItemRequestDTO {
    @Min(1)
    private Integer productId;

    @Min(1)
    private Integer quantity;

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
