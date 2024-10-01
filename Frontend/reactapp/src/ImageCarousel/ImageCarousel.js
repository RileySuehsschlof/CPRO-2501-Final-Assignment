import React, { useState } from 'react';
import './ImageCarousel.css';
// import selfie from './selfie.jpg';

const ImageCarousel = (product) => {
    // const images = [
    //     selfie, // Use the imported selfie image
    //     'https://urltoimage.com/400x400?text=Image2',
    //     'https://urltoimage.com/400x400?text=Image3',
    // ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="carousel">
            <button onClick={prevImage}>Previous</button>
            <img src={product.images[currentImageIndex]} alt={`Slide ${currentImageIndex + 1}`} />
            <button onClick={nextImage}>Next</button>
        </div>
    );
};

export default ImageCarousel;
