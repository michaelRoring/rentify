import React from 'react';
import { TextTitle } from '.';

const CardTotal = (props) => {
  return (
    <div className="
        relative 
        border
        border-[#ffffff20]
        rounded-[6px]
        backdrop-blur-lg 
        bg-[#ffffff07]
        flex
        flex-col
        px-[50px]
        py-[20px]
      " >
        <div className="text-[16px] font-inter">{props.title}</div>
        <TextTitle>{props.content}</TextTitle>
    </div>
  );
}

export default CardTotal;
