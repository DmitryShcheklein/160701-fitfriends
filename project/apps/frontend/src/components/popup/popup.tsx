import React, { HTMLAttributes, FC } from 'react';
import classNames from 'classnames';

interface PopupProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  title: string;
  showCloseButton?: boolean;
  showHead?: boolean;
  onClose?: () => void;
}

const Popup: FC<PopupProps> = ({
  isOpen,
  title,
  children,
  onClose,
  showCloseButton,
  showHead = true,
  className,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={classNames('popup-form', className)}>
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          {showHead && (
            <div className="popup-form__title-wrapper">
              <h1 className="popup-form__title">{title}</h1>
              {showCloseButton && (
                <button
                  className="btn-icon btn-icon--outlined btn-icon--big"
                  type="button"
                  aria-label="close"
                  onClick={onClose}
                >
                  <svg width="20" height="20" aria-hidden="true">
                    <use xlinkHref="#icon-cross"></use>
                  </svg>
                </button>
              )}
            </div>
          )}
          <div className="popup-form__body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
