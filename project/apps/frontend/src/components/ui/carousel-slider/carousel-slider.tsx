import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import classNames from 'classnames';
import 'swiper/css';
import './carousel-slider.css';
import EmptyBlock from '../../empty-block/empty-block';

interface SliderProps {
  id: string;
  title: string;
  slides?: React.ReactNode[];
  extraButton?: React.ReactNode;
  options?: SwiperOptions;
  classNamesMap?: {
    wrapper?: string;
  };
}

const CarouselSlider = ({
  title,
  slides,
  extraButton,
  options = {},
  id,
  classNamesMap = {},
}: SliderProps) => {
  const prevButtonClass = `${id}-prev`;
  const nextButtonClass = `${id}-next`;
  const { wrapper } = classNamesMap;

  if (!slides?.length) {
    return <EmptyBlock className={wrapper} />;
  }

  return (
    <section className="slider-section">
      <div className={classNames('slider-wrapper', wrapper)}>
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

export default CarouselSlider;
