import React, { HTMLAttributes } from 'react';

const PopupOverlay = ({ onClick }: HTMLAttributes<HTMLButtonElement>) => {
  return <button className="" onClick={onClick} />;
};

export default PopupOverlay;
