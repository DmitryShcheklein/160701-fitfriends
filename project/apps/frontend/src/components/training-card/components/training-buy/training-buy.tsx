import Popup from '../../../ui/popup/popup';
import { BuyForm } from '../../../forms/buy-form/buy-form';
import { useState } from 'react';
import { useGetByTrainingIdQuery } from '../../../../store/balance-process/balance-api';
import { TrainingRdo } from '@project/rdo';

interface TrainingBuyProps {
  training?: TrainingRdo;
  trainingId: string;
}
export const TrainingBuy = ({ training, trainingId }: TrainingBuyProps) => {
  const { data: balances, refetch: refetchBalances } =
    useGetByTrainingIdQuery(trainingId);
  const canBuy = balances?.every((item) => item.isFinished);

  const [showBuyModal, setShowBuyModal] = useState(false);
  const onButtonBuyClick = () => {
    setShowBuyModal(!showBuyModal);
  };

  return (
    <>
      <button
        onClick={onButtonBuyClick}
        className="btn training-info__buy"
        type="button"
        disabled={!canBuy}
      >
        Купить
      </button>
      <Popup
        isOpen={showBuyModal}
        title="Купить тренировку"
        showCloseButton
        onClose={() => setShowBuyModal(false)}
      >
        <BuyForm
          training={training}
          onSuccess={() => {
            setShowBuyModal(false);
            refetchBalances();
          }}
        />
      </Popup>
    </>
  );
};
