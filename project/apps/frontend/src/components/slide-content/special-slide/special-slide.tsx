import { TrainingRdo } from '@project/rdo';
import { AppRoute } from '../../../shared/const';
import { Link } from 'react-router-dom';

interface SpecialSlideProps {
  training: TrainingRdo;
}

export const SpecialSlide = ({ training }: SpecialSlideProps) => {
  return (
    <li className="special-for-you__item">
      <div className="thumbnail-preview">
        <div className="thumbnail-preview__image">
          <picture>
            <img
              src={training.backgroundImage}
              width="452"
              height="191"
              alt=""
            />
          </picture>
        </div>
        <div className="thumbnail-preview__inner">
          <h3 className="thumbnail-preview__title">{training.name}</h3>
          <div className="thumbnail-preview__button-wrapper">
            <Link
              to={`${AppRoute.TrainingPage}/${training.id}`}
              className="btn btn--small thumbnail-preview__button"
            >
              Подробнее
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};
