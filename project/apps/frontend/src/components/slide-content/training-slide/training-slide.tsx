import { TrainingRdo } from '@project/rdo';
import { AppRoute } from '../../../shared/const';
import { Link } from 'react-router-dom';

interface TrainingSlideProps {
  training: TrainingRdo;
}

export const TrainingSlide = ({ training }: TrainingSlideProps) => {
  return (
    <div className="thumbnail-training">
      <div className="thumbnail-training__inner">
        <div className="thumbnail-training__image">
          <picture>
            <img
              src={training.backgroundImage}
              width="330"
              height="190"
              alt=""
            />
          </picture>
        </div>
        <p className="thumbnail-training__price">
          <span className="thumbnail-training__price-value">
            {training.price}
          </span>
          <span>₽</span>
        </p>
        <h3 className="thumbnail-training__title">{training.name}</h3>
        <div className="thumbnail-training__info">
          <div className="thumbnail-training__rate">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <span className="thumbnail-training__rate-value">
              {training.rating}
            </span>
          </div>
        </div>
        <div className="thumbnail-training__text-wrapper">
          <p className="thumbnail-training__text">
            Узнайте правильную технику бега, развивайте выносливость
            и&nbsp;откройте для себя все секреты длительных пробежек.
          </p>
        </div>
        <div className="thumbnail-training__button-wrapper">
          <Link
            to={`${AppRoute.TrainingPage}/${training.id}`}
            className="btn btn--small thumbnail-training__button-catalog"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};
