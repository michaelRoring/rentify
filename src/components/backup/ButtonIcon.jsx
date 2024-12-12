import Image from 'next/image';
import React from 'react';

const ButtonIcon = ({icon, ...buttonProps}) => {
  return (
    <button {...buttonProps} className="w-[40px] h-[40px] flex items-center justify-center border rounded-lg hover:border-blue-500">
      <Image src={icon} alt="icon grip" width={14} height={14} />
    </button>
  );
}

export default ButtonIcon;
