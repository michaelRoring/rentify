import React from 'react';

const Container = ({children}) => {
  return (
    <div className="p-[20px] md:mx-auto">
      {children}
    </div>
  );
}

export default Container;
