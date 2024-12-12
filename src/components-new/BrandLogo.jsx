import Image from 'next/image';
import React from 'react';
import brandImageLogo from '../../public/logo.svg';

const BrandLogo = () => {
  return (
    <div>
      <Image
        src={brandImageLogo} 
        alt="Rentify Logo" 
        width={133} 
        heught={42.11}
      />
    </div>
  );
}

export default BrandLogo;
