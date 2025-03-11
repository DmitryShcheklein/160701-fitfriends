import Popup from '../../../ui/popup/popup';
import { BuyForm } from '../../../forms/buy-form/buy-form';
import { useState } from 'react';
import { useGetByTrainingIdQuery } from '../../../../store/balance-process/balance-api';
import { TrainingRdo } from '@project/rdo';
import { useGetCurrentUserQuery } from '../../../../store/user-process/user-api';

interface TrainingBuyProps {
  training: TrainingRdo;
}
export const TrainingBuy = ({ training }: TrainingBuyProps) => {
  const { data: balances, refetch: refetchBalances } = useGetByTrainingIdQuery(
    training.id
  );
  const canBuy = balances?.every((item) => item.isFinished);

  const { data: userData } = useGetCurrentUserQuery();
  const isUserTrainingCreator = training.trainer.id === userData?.id;

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
        disabled={!canBuy || isUserTrainingCreator}
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
