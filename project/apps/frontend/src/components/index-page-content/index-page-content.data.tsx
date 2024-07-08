export const popularTrainingsSlides = Array.from({ length: 10 }, () => {
  return (
    <div className="thumbnail-training">
      <div className="thumbnail-training__inner">
        <div className="thumbnail-training__image">
          <picture>
            <source
              type="image/webp"
              srcSet="img/content/thumbnails/training-06.webp, img/content/thumbnails/training-06@2x.webp 2x"
            />
            <img
              src="img/content/thumbnails/training-06.jpg"
              srcSet="img/content/thumbnails/training-06@2x.jpg 2x"
              width="330"
              height="190"
              alt=""
            />
          </picture>
        </div>
        <p className="thumbnail-training__price">
          <span className="thumbnail-training__price-value">1600</span>
          <span>₽</span>
        </p>
        <h3 className="thumbnail-training__title">run, forrest, run</h3>
        <div className="thumbnail-training__info">
          <ul className="thumbnail-training__hashtags-list">
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag">
                <span>#бег</span>
              </div>
            </li>
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag">
                <span>#500ккал</span>
              </div>
            </li>
          </ul>
          <div className="thumbnail-training__rate">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <span className="thumbnail-training__rate-value">5</span>
          </div>
        </div>
        <div className="thumbnail-training__text-wrapper">
          <p className="thumbnail-training__text">
            Узнайте правильную технику бега, развивайте выносливость
            и&nbsp;откройте для себя все секреты длительных пробежек.
          </p>
        </div>
        <div className="thumbnail-training__button-wrapper">
          <a
            className="btn btn--small thumbnail-training__button-catalog"
            href="#"
          >
            Подробнее
          </a>
          <a
            className="btn btn--small btn--outlined thumbnail-training__button-catalog"
            href="#"
          >
            Отзывы
          </a>
        </div>
      </div>
    </div>
  );
});

export const specialForYouSlides = Array.from({ length: 10 }, () => {
  return (
    <li className="special-for-you__item">
      <div className="thumbnail-preview">
        <div className="thumbnail-preview__image">
          <picture>
            <source
              type="image/webp"
              srcSet="img/content/thumbnails/preview-03.webp, img/content/thumbnails/preview-03@2x.webp 2x"
            />
            <img
              src="img/content/thumbnails/preview-03.jpg"
              srcSet="img/content/thumbnails/preview-03@2x.jpg 2x"
              width="452"
              height="191"
              alt=""
            />
          </picture>
        </div>
        <div className="thumbnail-preview__inner">
          <h3 className="thumbnail-preview__title">crossfit</h3>
          <div className="thumbnail-preview__button-wrapper">
            <a className="btn btn--small thumbnail-preview__button" href="#">
              Подробнее
            </a>
          </div>
        </div>
      </div>
    </li>
  );
});
