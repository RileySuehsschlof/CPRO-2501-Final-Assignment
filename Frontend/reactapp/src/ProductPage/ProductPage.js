import React from 'react';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import selfie from '../ImageCarousel/selfie.jpg';
import './ProductPage.css';

//an example object that represents a product
const product = {
    name: "Sample Product",
    images: [
        selfie,
        'https://via.placeholder.com/400x300?text=Image+2',
        'https://via.placeholder.com/400x300?text=Image+3',
    ],
    description: "This is a great product that you will love!",
    price: 29.99
};

//will take in an object and display the details
const ProductPage = ({ product }) => {
    return (
        <div className="product-page">
            <div className="column">
                {/* calling our Image carousel */}
                <ImageCarousel images={product.images} />
            </div>
            <div className="column">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
            </div>

            <div className="column">
                <p>Price: ${product.price}</p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
                <button onClick={() => addToWishlist(product)}>Add to Wishlist</button>
            </div>

        </div>
    );
}
//will eventually send the product to the cart
const addToCart = (product) => { console.log(`added: ${product.name} to cart`); }
//will eventually send the product to the wishlist
const addToWishlist = (product) => { console.log(`added: ${product.name} to wishlist`); }

export default ProductPage;