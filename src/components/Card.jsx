import React from 'react';

const Card = ({children}) => {
  return (
    <div className="bg-white p-[20px] rounded-xl">
      {children}
    </div>
  );
}

export default Card;
