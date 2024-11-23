import React, { useState } from 'react';
import './ImageCarousel.css';
// import selfie from './selfie.jpg';

const ImageCarousel = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };


    //standard url for springboot static files
    const baseUrl = "http://localhost:8881/";

    return (
        <div className="carousel">
            <button onClick={prevImage}>Previous</button>
            <img
                className="carousel-image"
                src={`${baseUrl}${images[currentImageIndex]}`} // Prepending base URL
                alt={`Slide ${currentImageIndex + 1}`}
            />
            <button onClick={nextImage}>Next</button>
        </div>
    );
};

export default ImageCarousel;
