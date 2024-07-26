import { ChangeEvent, FormEvent, useState } from 'react';
import { CommentValidator } from '@project/validation';
import { toast } from 'react-toastify';
import { useCreateCommentMutation } from '../../../store/comments-process/comments-api';

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
    rating: '',
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
    }
  };
  const ratings = Array.from(
    { length: CommentValidator.Rating.Max },
    (_, idx) => `${(idx += 1)}`
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
                  checked={formData.rating === rate}
                  onChange={handleInputChange}
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
