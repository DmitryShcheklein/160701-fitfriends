import { TrainingRdo } from '@project/rdo';
import { AppRoute } from '../../shared/const';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import { specializationOptions } from '../../shared/data';

interface TrainingCardMinProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className' | 'children'> {
  training: TrainingRdo;
}

export const TrainingCardMin = ({
  training,
  className,
  children,
}: TrainingCardMinProps) => {
  return (
    <div className={classNames('thumbnail-training', className)}>
      <div className="thumbnail-training__inner">
        <div className="thumbnail-training__image">
          {training.backgroundImage ? (
            <picture>
              <img
                src={training.backgroundImage}
                width="330"
                height="190"
                alt=""
              />
            </picture>
          ) : null}
        </div>
        <p className="thumbnail-training__price">
          <span className="thumbnail-training__price-value">
            {training.price}
          </span>
          <span>₽</span>
        </p>
        <h3 className="thumbnail-training__title">{training.name}</h3>
        <div className="thumbnail-training__info">
          <ul className="thumbnail-training__hashtags-list">
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag">
                <span>
                  #
                  {specializationOptions
                    .find((item) => item.value === training.trainingType)
                    ?.label.toLowerCase()}
                </span>
              </div>
            </li>
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag">
                <span>#{training?.calories}ккал</span>
              </div>
            </li>
          </ul>
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
            to={`${AppRoute.TrainingCardPage}/${training.id}`}
            className="btn btn--small thumbnail-training__button-catalog"
          >
            Подробнее
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
};
