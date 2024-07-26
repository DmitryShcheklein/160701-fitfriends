import { HTMLAttributes } from 'react';
import styles from './popup.module.css';

const PopupOverlay = ({ onClick }: HTMLAttributes<HTMLButtonElement>) => {
  return <button className={styles.bg} onClick={onClick} />;
};

export default PopupOverlay;
