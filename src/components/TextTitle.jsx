import React from 'react';

const TextTitle = ({children}) => {
  return (
    <h1 className="text-3xl font-extrabold text-[#0F123F] mb-[40px]">
      {children}
    </h1>
  );
}

export default TextTitle;
