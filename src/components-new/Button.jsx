import React from 'react';
import Icon from './Icon';

const Button = ({className, color, size, withIcon, children, ...buttonProps}) => {
  let buttonColor = color == 'primary' ? 'bg-[#0D7373]' : 'bg-[#ffffff14]'
  let buttonSize = size == 'md' ? 'py-[16px] px-[32px]' : 'py-[6px] px-[14px]'
  return (
    <div>
      <button 
        className={`
          flex
          gap-[10px]
          justify-center
          items-center
          border
          border-[#ffffff20]
          rounded-[6px]
          text-[16px]
          font-[500]
          disabled:opacity-[0.4]
          disabled:cursor-not-allowed
          ${buttonColor}
          ${buttonSize}
          ${className}
        `}
        {...buttonProps}
        >
        {withIcon && <Icon name={withIcon} size={16} />}
        <span>{children}</span>
      </button>
    </div>
  );
}

export default Button;
