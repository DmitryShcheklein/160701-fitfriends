import React, { useState } from 'react';
import classNames from 'classnames';

const ReviewForm: React.FC = () => {
  const [rating, setRating] = useState<number>(5);
  const [description, setDescription] = useState<string>('');

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  return (
    // <div className="popup-form popup-form--feedback">
    //   <section className="popup">
    //     <div className="popup__wrapper">
    //       <div className="popup-head">
    //         <h2 className="popup-head__header">Оставить отзыв</h2>
    //         <button
    //           className="btn-icon btn-icon--outlined btn-icon--big"
    //           type="button"
    //           aria-label="close"
    //         >
    //           <svg width="20" height="20" aria-hidden="true">
    //             <use xlinkHref="#icon-cross"></use>
    //           </svg>
    //         </button>
    //       </div>
    <div className="popup__content popup__content--feedback">
      <h3 className="popup__feedback-title">Оцените тренировку</h3>
      <ul className="popup__rate-list">
        {[1, 2, 3, 4, 5].map((rate) => (
          <li className="popup__rate-item" key={rate}>
            <div className="popup__rate-item-wrap">
              <label>
                <input
                  type="radio"
                  name="оценка тренировки"
                  aria-label={`оценка ${rate}.`}
                  value={rate}
                  checked={rating === rate}
                  onChange={handleRatingChange}
                />
                <span className="popup__rate-number">{rate}</span>
              </label>
            </div>
          </li>
        ))}
      </ul>
      <div className="popup__feedback">
        <h3 className="popup__feedback-title popup__feedback-title--text">
          Поделитесь своими впечатлениями о тренировке
        </h3>
        <div className="popup__feedback-textarea">
          <div className="custom-textarea">
            <label>
              <textarea
                name="description"
                placeholder=" "
                value={description}
                onChange={handleDescriptionChange}
              ></textarea>
            </label>
          </div>
        </div>
      </div>
      <div className="popup__button">
        <button className="btn" type="button">
          Продолжить
        </button>
      </div>
    </div>
    //     </div>
    //   </section>
    // </div>
  );
};

export default ReviewForm;
