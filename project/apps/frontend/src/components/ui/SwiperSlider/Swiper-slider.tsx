import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import 'swiper/css';
import './swiper-slider.css';

interface SliderProps {
  id: string;
  title: string;
  slides: React.ReactNode[];
  extraButton?: React.ReactNode;
  options?: SwiperOptions;
}

const SwiperSlider: React.FC<SliderProps> = ({
  title,
  slides,
  extraButton,
  options = {},
  id,
}) => {
  const prevButtonClass = `${id}-prev`;
  const nextButtonClass = `${id}-next`;

  return (
    <section className="slider-section">
      <div className="slider-wrapper">
        <div className="slider-title-wrapper">
          <h2 className="slider-title">{title}</h2>
          {extraButton && extraButton}
          <div className="slider-controls">
            <button
              className={`btn-icon slider-control ${prevButtonClass}`}
              type="button"
              aria-label="previous"
            >
              <svg width="16" height="14" aria-hidden="true">
                <use xlinkHref="#arrow-left"></use>
              </svg>
            </button>
            <button
              className={`btn-icon slider-control ${nextButtonClass}`}
              type="button"
              aria-label="next"
            >
              <svg width="16" height="14" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
          </div>
        </div>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          navigation={{
            prevEl: `.${prevButtonClass}`,
            nextEl: `.${nextButtonClass}`,
          }}
          {...options}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>{slide}</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SwiperSlider;
