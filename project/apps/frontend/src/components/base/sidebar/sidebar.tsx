import { FC, PropsWithChildren } from 'react';
import './sidebar.css';
import classNames from 'classnames';

export const Sidebar: FC<PropsWithChildren<{ isCatalog?: boolean }>> = ({
  children,
  isCatalog,
}) => {
  return (
    <aside className={classNames('sidebar', { 'sidebar--catalog': isCatalog })}>
      {children}
    </aside>
  );
};
