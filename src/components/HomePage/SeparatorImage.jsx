import React from 'react';
import homeImage from '../../assets/home/home_2.png'; 
import './SeparatorImage.css'; 

function SeparatorImage() {
  

  return (
    <section className="separator-section">
      <img src={homeImage} alt="Тематическая картинка" />
    </section>
  );
}

export default SeparatorImage;
