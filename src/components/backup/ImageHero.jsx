import Image from 'next/image';
import React from 'react';

const ImageHero = ({source, alt}) => {
  return (
    <div className="mb-[20px] md:mb-[40px] -m-[20px] md:m-0">
      <Image 
        src={source} 
        alt={alt} 
        width={0}
  height={0}
  sizes="100vw"
  style={{ width: '100%', height: 'auto' }} // optional
        priority
      />
    </div>
  );
}

export default ImageHero;
