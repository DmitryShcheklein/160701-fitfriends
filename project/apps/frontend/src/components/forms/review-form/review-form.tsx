import { ChangeEvent, FormEvent, useState } from 'react';
import { CommentValidation } from '@project/validation';
import { toast } from 'react-toastify';
import { useCreateCommentMutation } from '../../../store/comments-process/comments-api';
import { groupErrors } from '../../../shared/helpers/groupErrors';

const FieldName = {
  Rating: 'rating',
  Message: 'message',
} as const;

type FieldName = (typeof FieldName)[keyof typeof FieldName];
type TState = Record<FieldName, any>;

interface ReviewFormProps {
  id: string;
  onSuccess: () => void;
}
const ReviewForm = ({ id, onSuccess }: ReviewFormProps) => {
  const [formData, setFormData] = useState<TState>({
    rating: undefined,
    message: '',
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [createComment, { isLoading }] = useCreateCommentMutation();
  const handleSubmitForm = async (evt: FormEvent) => {
    evt.preventDefault();

    try {
      await createComment({
        id,
        rating: Number(formData.rating),
        message: formData.message,
      }).unwrap();

      toast.success('Данные успешно сохранены!');
      onSuccess();
    } catch (err: any) {
      console.error('Failed to send: ', err);

      const groupedErrors = groupErrors(err.data.message);
      Object.keys(groupedErrors).forEach((key) => {
        const errorMessage = groupedErrors[key].join('\n');
        toast.error(errorMessage, {
          style: { whiteSpace: 'pre-line' },
          autoClose: 5_000,
        });
      });
    }
  };
  const ratings = Array.from(
    Array(CommentValidation.Rating.Max),
    (_, idx) => (idx += 1)
  );

  return (
    <form
      onSubmit={handleSubmitForm}
      className="popup__content popup__content--feedback"
    >
      <h3 className="popup__feedback-title">Оцените тренировку</h3>
      <ul className="popup__rate-list">
        {ratings.map((rate) => (
          <li className="popup__rate-item" key={rate}>
            <div className="popup__rate-item-wrap">
              <label>
                <input
                  type="radio"
                  name={FieldName.Rating}
                  aria-label={`оценка ${rate}.`}
                  value={rate}
                  checked={formData.rating === String(rate)}
                  onChange={handleInputChange}
                  required
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
                name={FieldName.Message}
                value={formData.message}
                onChange={handleInputChange}
                minLength={CommentValidation.Message.Min}
                maxLength={CommentValidation.Message.Max}
              ></textarea>
            </label>
          </div>
        </div>
      </div>
      <div className="popup__button">
        <button className="btn" type="submit" disabled={isLoading}>
          Продолжить
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
