import React from 'react';
import { SpinAnimation } from '.';

const LoadingScreen = () => {
  return (
    <div className="fixed h-full w-full top-0 left-0 bg-[#ffffffb0] z-30 flex justify-center items-center font-semibold gap-[10px]">
      <SpinAnimation /> Loading...
    </div>
  );
}

export default LoadingScreen;
