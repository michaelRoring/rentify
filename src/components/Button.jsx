import React from 'react';

const Button = ({label, color, ...buttonProps}) => {
  const buttonColor = color == 'primary' ? 'bg-[#AF90EB] border-[#AF90EB] text-white' : 'bg-white border-[#AF90EB] text-[#AF90EB]'  
  return (
    <button 
      className={`
        px-[20px]
        py-[10px]
        border
        focus:border-[#AF90EB]
        focus:outline-none
        rounded-lg
        font-semibold
        ${buttonColor}
      `}
      {...buttonProps}
    >
      {label}
    </button>
  );
}

export default Button;
