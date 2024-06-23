import { FC, PropsWithChildren } from 'react';
import SingleSlider from '../ui/single-slider/single-slider';

const SpecialOffers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className="special-offers">
      <div className="special-offers__wrapper">
        <h2 className="visually-hidden">Специальные предложения</h2>

        <SingleSlider />

        <div className="thumbnail-spec-gym">
          <div className="thumbnail-spec-gym__image">
            <picture>
              <source
                type="image/webp"
                srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x"
              />
              <img
                src="img/content/thumbnails/nearest-gym-01.jpg"
                srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x"
                width="330"
                height="190"
                alt=""
              />
            </picture>
          </div>
          <div className="thumbnail-spec-gym__header">
            <h3 className="thumbnail-spec-gym__title">
              Скоро здесь появится что - то полезное
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
