import React from 'react';
import TextTitle from './TextTitle';
import Image from 'next/image';
import ImageRENT from '../../public/rent.svg'
import ImageFDV from '../../public/fdv.svg'
import ImageETH from '../../public/eth.svg'
import ImageRENTShadow from '../../public/rent-shadow.svg'
import ImageFDVShadow from '../../public/fdv-shadow.svg'
import ImageETHShadow from '../../public/eth-shadow.svg'

const CardSummary = (props) => {

  let imageIcon = '';
  let imageShadow = '';

  switch (props.type) {
    case "rent":
      imageIcon = ImageRENT
      imageShadow = ImageRENTShadow
      break;
    case "fdv":
      imageIcon = ImageFDV
      imageShadow = ImageFDVShadow
      break;
    case "eth":
      imageIcon = ImageETH
      imageShadow = ImageETHShadow
      break;
    default:
      imageIcon = ImageFDV
      imageShadow = ImageFDVShadow
      break;
  }

  return (
    <div className="relative pt-[40px]">
      <div className="
        relative 
        border
        border-[#ffffff20]
        rounded-[6px]
        backdrop-blur-lg 
        bg-[#ffffff07]
        flex
        flex-col
        items-center
      " >
        <div className="absolute -top-[40px] z-10">
          <Image 
            src={imageIcon} 
            width={80} 
            height={80} 
            alt="icon-summary"
            priority
          />
        </div>
        <div className="absolute top-0 w-[80%] z-0">
          <Image 
            src={imageShadow} 
            alt="shadow-icon-summary"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }} // optional
            priority
          />
        </div>
        <div className="
          px-[67px]
          pt-[80px]
          pb-[40px]
          text-center
          z-10
        ">
          <div className="text-[16px]">{props.title}</div>
          <TextTitle>{props.total}</TextTitle>
        </div>
      </div>
    </div>
  );
}

export default CardSummary;
