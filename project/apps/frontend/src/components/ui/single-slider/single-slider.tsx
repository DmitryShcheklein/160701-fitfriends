import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './single-slider.css';
import { slidesData } from '../../special-offers/special-offers.data';

const SingleSlider = () => {
  return (
    <div className="special-offers__list">
      <Swiper
        className="single-slider"
        modules={[Pagination, EffectFade]}
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        effect="fade"
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="promo-slider">
              <div className="promo-slider__overlay"></div>
              <div className="promo-slider__image">
                <img
                  src={slide.image.src}
                  srcSet={slide.image.srcSet}
                  alt={slide.image.alt}
                  width="1040"
                  height="469"
                />
              </div>
              <div className="promo-slider__header">
                <h3 className="promo-slider__title">{slide.title}</h3>
                <div className="promo-slider__logo">
                  <svg width="74" height="74" aria-hidden="true">
                    <use xlinkHref={slide.logo}></use>
                  </svg>
                </div>
              </div>
              <span className="promo-slider__text">{slide.text}</span>
              <div className="promo-slider__bottom-container">
                <div className="promo-slider__price-container">
                  <p className="promo-slider__price">{slide.price}</p>
                  <p className="promo-slider__sup">за занятие</p>
                  <p className="promo-slider__old-price">{slide.oldPrice}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SingleSlider;
