import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import InfoCard from '../infoCard/InfoCard';

// Импортируем стили Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import './infoCardSlider.css';

const InfoCardSlider = ({ cards }) => {
  return (
    <div className="info-card-slider">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="info-swiper"
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            <InfoCard image={card.image} text={card.text} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default InfoCardSlider; 