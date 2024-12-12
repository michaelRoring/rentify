import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const ButtonIcon = ({icon, iconStyles, ...buttonProps}) => {
  return (
    <button className="" {...buttonProps}>
      <FontAwesomeIcon icon={icon} className={`text-slate-300 hover:text-[#9269E2] ${buttonProps.iconStyles}`}/>
    </button>
  );
}

export default ButtonIcon;
