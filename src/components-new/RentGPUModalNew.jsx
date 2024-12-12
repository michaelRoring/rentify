import React, { useEffect, useState } from 'react';
import Icon from './Icon';
import InputSelect from './InputSelect'
import { Button } from '.';
import { ethers } from 'ethers';
import { toEther, toWei } from '@thirdweb-dev/sdk';
import { convertPriceToCurrency } from '@/utils/convertPriceToCurrency';


const RentGPUModalNew = ({isLoading, ...props}) => {

  const [priceSelected, setPriceSelected] = useState(null);

  useEffect(() => {
    
   console.log('priceSelected', priceSelected);
  }, [priceSelected]);

  return (
    <div className="fixed p-[20px] left-0 top-0 w-full h-full bg-black/60 backdrop-blur-lg flex justify-center items-center z-10">
      <div className="
        relative 
        w-full
        border
        border-[#4b4b4b]
        rounded-2xl
        backdrop-blur-md 
        bg-[#2929295c]
        flex
        flex-col
        items-center
        overflow-hidden
        shadow-lg
        shadow-[#32B5B520]
        sm:max-w-sm
        md:max-w-md
        md:min-h-[350px]
        py-[50px]
        px-[50px]
        z-20
      ">
        <button className="absolute right-[16px] top-[16px]" onClick={props.handleClose}>
          <Icon name="icon-close"/>
        </button>
        <div className="text-[24px] front-[500] mb-[20px]">Select Rent Duration</div>
        
       <div className="w-full flex flex-col gap-[16px]">
        {props.rentPrice && 
          <SelectPrice 
            data={props.rentPrice}
            symbolFrom={props.symbol.symbolFrom}
            symbolTo={props.symbol.symbolTo}
            marketPrice={props.marketPrice}
            selectedId={priceSelected?.id}
            handleClick={(value) => setPriceSelected(value)}
          />
        }
        <Button 
          color="primary" 
          className="w-full" 
          onClick={() => props.handleSubmitRent(priceSelected)}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Rent now'}
        </Button>
       </div>
      </div>
    </div>
  );
}

const SelectPrice = (props) => {
  return (
    <div className="flex flex-col gap-[6px]">
      {props.data.map((item, index) => 
        <ItemPrice 
          key={index} 
          id={index}
          {...item}
          {...props}
        />
      )}
    </div>
  )
}

const ItemPrice = (props) => {
  console.log(props.marketPrice);
  return (
    <button 
      onClick={() => props.handleClick({id: props.id, ...props})}
      className="
        w-full
        grid 
        grid-cols-3 
        items-center
        px-[16px] 
        py-[10px] 
        border 
        rounded-[6px]
        border-white/20 
        hover:border-[#0D7373]
      "
    >
      <div className="col-span-2 flex items-center gap-[10px]">
        <div>
          {props.selectedId == props.id
            ? <Icon name="icon-check" size={20}/>
            : <Icon name="icon-circle" size={20}/>
          }
        </div>
        <div className="text-left">
          <div className="">{props.amount} {props.symbolFrom}</div>
          <div className="text-[12px] text-white/50">
            {convertPriceToCurrency(props.amount, props.marketPrice)}
            {" "}
            {props.symbolTo}
          </div>
        </div>
      </div>
      <div className="text-right">1 {props.period}</div>
    </button>
  )
}

export default RentGPUModalNew;

