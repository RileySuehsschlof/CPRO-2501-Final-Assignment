// src/pages/MainPage.js

import React from 'react';
import Card from '../Components/Card';
import './MainPage.css';

const MainPage = ({ regCardData, recommendedCardData }) => {
  return (
    <div className="main-page">
      <h1>On Sale</h1>
      <div id="regCards">
        {regCardData.map((data, index) => (
          <Card key={index} {...data} />
        ))}
      </div>
      <h1>Products You Might Like</h1>
      <div id="recommendedCards">
        {recommendedCardData.map((data, index) => (
          <Card key={index} {...data} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
