import { HTMLAttributes, FC, useEffect } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import PopupOverlay from './popup-overlay';

interface PopupProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className' | 'children'> {
  isStatic?: boolean;
  isOpen?: boolean;
  title?: string;
  showCloseButton?: boolean;
  showHead?: boolean;
  onClose?: () => void;
}

const Popup: FC<PopupProps> = ({
  isStatic,
  isOpen = isStatic,
  title,
  children,
  onClose,
  showCloseButton,
  showHead = true,
  className,
}) => {
  const handleEscClose = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      onClose?.();
    }
  };

  useEffect(() => {
    if (isStatic) return;
    document.addEventListener('keyup', handleEscClose);

    return () => {
      document.removeEventListener('keyup', handleEscClose);
    };
  });

  if (!isStatic && !isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={classNames('popup-form', className)}>
      <section className="popup">
        {!isStatic ? <PopupOverlay onClick={onClose} /> : null}
        <div className="popup__wrapper">
          {showHead && (
            <div className="popup-head">
              <h1 className="popup-head__header">{title}</h1>
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
          {children}
        </div>
      </section>
    </div>,
    document.body
  );
};

export default Popup;
