import { useState } from 'react';
import Popup from '../../../ui/popup/popup';
import ReviewForm from '../../../forms/review-form/review-form';
import { useGetCommentsByTrainingIdQuery } from '../../../../store/comments-process/comments-api';
import { useGetByTrainingIdQuery } from '../../../../store/balance-process/balance-api';
import { useGetCurrentUserQuery } from '../../../../store/user-process/user-api';
import { TrainingRdo } from '@project/rdo';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../shared/const';

interface CommentsProps {
  training: TrainingRdo;
}

export const Comments = ({ training }: CommentsProps) => {
  const { id: trainingId, trainer } = training;
  const [showReviewModal, setShowReviewModal] = useState(false);
  const { data: comments } = useGetCommentsByTrainingIdQuery(trainingId);
  const { data: balances } = useGetByTrainingIdQuery(trainingId);
  const isFinished = balances?.some((item) => item.isFinished);
  const { data: userData } = useGetCurrentUserQuery();
  const isUserTrainingCreator = trainer.id === userData?.id;

  return (
    <>
      {comments?.length ? (
        <>
          <h2 className="reviews-side-bar__title">Отзывы</h2>
          <ul className="reviews-side-bar__list">
            {comments.map(({ id, message, rating, user }) => {
              return (
                <li className="reviews-side-bar__item" key={id}>
                  <div className="review">
                    <Link
                      to={`${AppRoute.UserCard}/${user.id}`}
                      className="review__user-info"
                    >
                      {user.avatarPath ? (
                        <div className="review__user-photo">
                          <picture>
                            <img
                              src={user.avatarPath}
                              width="64"
                              height="64"
                              alt="Изображение пользователя"
                            />
                          </picture>
                        </div>
                      ) : null}
                      <span className="review__user-name">
                        {user.firstName}
                      </span>
                      <div className="review__rating">
                        <svg width="16" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                        <span>{rating}</span>
                      </div>
                    </Link>
                    <p className="review__comment">{message}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      ) : null}

      <button
        className="btn btn--medium reviews-side-bar__button"
        type="button"
        onClick={() => setShowReviewModal(true)}
        disabled={!isFinished || isUserTrainingCreator}
      >
        Оставить отзыв
      </button>

      <Popup
        isOpen={showReviewModal}
        title="Оставить отзыв"
        showCloseButton
        onClose={() => setShowReviewModal(false)}
      >
        <ReviewForm
          id={trainingId}
          onSuccess={() => setShowReviewModal(false)}
        />
      </Popup>
    </>
  );
};
