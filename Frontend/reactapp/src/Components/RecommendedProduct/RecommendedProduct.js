import React, { useState, useEffect } from "react";
import axios from "axios";
import './RecommendedProduct.css';
import { Link } from "react-router-dom";

const RecommendedProductPage = ({ category, productId }) => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        // get the products with the same category from backend  but not with the same productId
        const fetchProductData = async () => {
            try {
                const response = await axios.get(`http://localhost:8881/ProductsByCategory`,
                    { params: { category: category, productId: productId } });
                setProducts(response.data);

            } catch (error) {
                setError("Failed to fetch product" + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();

    }, [category]);
    const baseUrl = "http://localhost:8881/";
    if (loading) {
        return <div>Loading...</div>;
    }

    // Handle error state
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="recommended-products">

            <div className="tile">
                {/* creates three cards that each hold a product */}
                {products && products.slice(0, 3).map((product) => (
                    <div key={product.id} className="product-card"> {/* Use product.id for a unique key */}
                        {/* when the user clicks, it leads to its product page */}
                        <Link to={`/product/${product.id}`} className="product-link">
                            <h3>{product.productName}</h3>

                            {/* Check if productImages exists and has at least one image */}
                            {product.productImages?.[0] ? (
                                <img
                                    src={baseUrl + product.productImages[0].imageUrl}
                                    alt={product.productName}
                                />
                            ) : (
                                <div>No Image Available</div>
                            )}
                        </Link>

                    </div>
                ))}
            </div>
        </div>


    );
};


export default RecommendedProductPage;
