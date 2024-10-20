import { TrainingRdo } from '@project/rdo';
import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import { PaymentVariant } from '@project/enums';
import { OrderValidator } from '@project/validation';
import { priceFormatter } from '../../../shared/helpers/priceFormatter';
import { toast } from 'react-toastify';
import { useCreateOrderMutation } from '../../../store/orders-process/orders-api';

const FieldName = {
  Quantity: 'quantity',
  PaymentType: 'paymentType',
} as const;

type FieldName = (typeof FieldName)[keyof typeof FieldName];
type TState = Record<FieldName, any>;

interface BuyFormProps {
  training?: TrainingRdo;
  onSuccess: () => void;
}

export const BuyForm = ({ training, onSuccess }: BuyFormProps) => {
  const [formData, setFormData] = useState<TState>({
    quantity: 1,
    paymentType: undefined,
  });
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  if (!training) {
    return null;
  }
  const { name, price, backgroundImage } = training;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;

    if (name === 'minus') {
      setFormData({
        ...formData,
        quantity: formData.quantity - 1,
      });
    }

    if (name === 'plus') {
      setFormData({
        ...formData,
        quantity: formData.quantity + 1,
      });
    }
  };

  const handleSubmitForm = async (evt: FormEvent) => {
    evt.preventDefault();

    try {
      await createOrder({
        trainingId: training.id,
        quantity: formData.quantity,
        paymentType: formData.paymentType,
      }).unwrap();

      toast.success('Заказ успешно создан');
      onSuccess();
    } catch (err: any) {
      console.error('Failed to send: ', err);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmitForm}
        className="popup__content popup__content--purchases"
      >
        <div className="popup__product">
          <div className="popup__product-image">
            <picture>
              <img src={backgroundImage} width="98" height="80" alt="" />
            </picture>
          </div>
          <div className="popup__product-info">
            <h3 className="popup__product-title">{name}</h3>
            <p className="popup__product-price">{price} ₽</p>
          </div>
          <div className="popup__product-quantity">
            <p className="popup__quantity">Количество</p>
            <div className="input-quantity">
              <button
                className="btn-icon btn-icon--quantity"
                type="button"
                aria-label="minus"
                name="minus"
                onClick={handleBtnClick}
                disabled={formData.quantity <= OrderValidator.Quantity.Min}
              >
                <svg width="12" height="12" aria-hidden="true">
                  <use xlinkHref="#icon-minus"></use>
                </svg>
              </button>
              <div className="input-quantity__input">
                <label>
                  <input
                    type="number"
                    name={FieldName.Quantity}
                    value={formData.quantity}
                    onChange={handleInputChange}
                    min={OrderValidator.Quantity.Min}
                    max={OrderValidator.Quantity.Max}
                  />
                </label>
              </div>
              <button
                className="btn-icon btn-icon--quantity"
                type="button"
                name="plus"
                aria-label="plus"
                onClick={handleBtnClick}
                disabled={formData.quantity >= OrderValidator.Quantity.Max}
              >
                <svg width="12" height="12" aria-hidden="true">
                  <use xlinkHref="#icon-plus"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <section className="payment-method">
          <h4 className="payment-method__title">Выберите способ оплаты</h4>
          <ul className="payment-method__list">
            {Object.values(PaymentVariant).map((value) => (
              <li className="payment-method__item" key={value}>
                <div className="btn-radio-image">
                  <label>
                    <input
                      type="radio"
                      name={FieldName.PaymentType}
                      value={value}
                      aria-label={value}
                      checked={formData.paymentType === value}
                      onChange={handleInputChange}
                    />
                    <span className="btn-radio-image__image">
                      <svg width="58" height="20" aria-hidden="true">
                        <use xlinkHref={`#${value}-logo`}></use>
                      </svg>
                    </span>
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <div className="popup__total">
          <p className="popup__total-text">Итого</p>
          <svg
            className="popup__total-dash"
            width="310"
            height="2"
            aria-hidden="true"
          >
            <use xlinkHref="#dash-line"></use>
          </svg>
          <p className="popup__total-price">
            {priceFormatter(price * formData.quantity)}&nbsp;₽
          </p>
        </div>
        <div className="popup__button">
          <button
            className="btn"
            type="submit"
            disabled={isLoading || !formData.quantity || !formData.paymentType}
          >
            Купить
          </button>
        </div>
      </form>
    </>
  );
};
