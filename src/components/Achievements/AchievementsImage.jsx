import React, { useState, useEffect } from "react";
import image7 from "../../assets/7.jpg";
import image8 from "../../assets/8.png";
import image9 from "../../assets/9.jpg";
import image10 from "../../assets/10.jpg";
import image11 from "../../assets/11.jpg";
import "./3DImageCarousel.css";

const images = [image7, image8, image9, image10, image11];

function AchievementsImage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState(null);
  const itemCount = images.length;
  const angle = 360 / itemCount;
  const radius = 450;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % itemCount);
    }, 5000);
    return () => clearInterval(timer);
  }, [itemCount]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? itemCount - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % itemCount);
  };

  const openModal = (index) => setModalIndex(index);
  const closeModal = () => setModalIndex(null);

  return (
    <section className="carousel-new-section">
      <h2 className="carousel-new-title">Achievements Gallery</h2>
      <div className="carousel-new-container">
        <button className="carousel-nav-button left" onClick={prevSlide}>
          &#10094;
        </button>
        <div className="carousel-new">
          {images.map((img, idx) => {
            // Calculate offset relative to current index
            const offset = idx - currentIndex;
            // Normalize offset for circular arrangement
            let norm = offset;
            if (offset < -Math.floor(itemCount / 2)) norm += itemCount;
            if (offset > Math.floor(itemCount / 2)) norm -= itemCount;
            // Compute transforms: horizontal shift, Z-axis depth, rotation, and scale
            const translateX = norm * 160;
            const rotateY = norm * -30;
            const translateZ = -Math.abs(norm) * 120;
            const scale = norm === 0 ? 1 : 0.8;
            const opacity = Math.abs(norm) > 2 ? 0 : 1;
            return (
              <div
                key={idx}
                className="carousel-new-item"
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity: opacity,
                  zIndex: 100 - Math.abs(norm),
                }}
                onClick={() => openModal(idx)}
              >
                <img src={img} alt={`Achievement ${idx + 1}`} />
                <div className="reflection">
                  <img src={img} alt="" />
                </div>
              </div>
            );
          })}
        </div>
        <button className="carousel-nav-button right" onClick={nextSlide}>
          &#10095;
        </button>
      </div>

      {modalIndex !== null && (
        <div className="modal-overlay-new" onClick={closeModal}>
          <div className="modal-content-new">
            <img src={images[modalIndex]} alt="Full View" />
            <button className="modal-close-button" onClick={closeModal}>
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default AchievementsImage;
