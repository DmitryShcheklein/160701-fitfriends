import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './single-slider.css';
import { TrainingRdo } from '@project/rdo';

interface SingleSliderProps {
  items: TrainingRdo[];
}

const SingleSlider = ({ items }: SingleSliderProps) => {
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
        {items.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="promo-slider">
              <div className="promo-slider__overlay"></div>
              <div className="promo-slider__image">
                <img
                  src={slide.backgroundImage}
                  alt={slide.name}
                  width="1040"
                  height="469"
                />
              </div>
              <div className="promo-slider__header">
                <h3 className="promo-slider__title">{slide.name}</h3>
                <div className="promo-slider__logo">
                  <svg width="74" height="74" aria-hidden="true">
                    <use xlinkHref="#logotype"></use>
                  </svg>
                </div>
              </div>
              <span className="promo-slider__text">{slide.description}</span>
              <div className="promo-slider__bottom-container">
                <div className="promo-slider__price-container">
                  <p className="promo-slider__price">{slide.price} ₽</p>
                  <p className="promo-slider__sup">за занятие</p>
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
