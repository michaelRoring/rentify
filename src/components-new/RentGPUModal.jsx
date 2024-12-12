import React, { useEffect, useState } from 'react';
import Icon from './Icon';
import InputSelect from './InputSelect'
import { Button } from '.';
import { ethers } from 'ethers';
import { toEther, toWei } from '@thirdweb-dev/sdk';
import { convertPriceToCurrency } from '@/utils/convertPriceToCurrency';

const intialDataOptions = [
  {id: 3, name: ''},
  {id: 6, name: ''},
  {id: 12, name: ''},
]
const RentGPUModal = ({isLoading, ...props}) => {
 
  const [duration, setDuration] = useState('');
  const [dataOption, setDataOption] = useState([]);

  useEffect(() => {
    if(!props.rentPrice || !props.marketPrice) return;
    const rentPriceParse = toWei(props.rentPrice.toString())
    // console.log('rentPriceParse', rentPriceParse);
    const rentPrice = rentPriceParse.toString()
    console.log('rentPrice', rentPrice);
    // return;
    const formatData = intialDataOptions.map(({id}) => {
      const _rentPrice = rentPrice * id 
      return ({
        id,
        name: `${toEther(_rentPrice.toString())} ${props.symbol.symbolFrom} 👉 ${id} month (${convertPriceToCurrency(props.rentPrice, props.marketPrice)} ${props.symbol.symbolTo})`
      })
    })
    setDataOption(formatData)
  }, [props.rentPrice, props.marketPrice, props.symbol.symbolFrom, props.symbol.symbolTo]);

  const handleSubmit = e => {
    e.preventDefault()
    if(!props.handleSubmitRent) return;

    props.handleSubmitRent({duration})
  }

  

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
        py-[20px]
        px-[50px]
        z-20
      ">
        <button className="absolute right-[16px] top-[16px]" onClick={props.handleClose}>
          <Icon name="icon-close"/>
        </button>
        <div className="text-[24px] front-[500] mb-[20px]">Select Rent Duration</div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-[16px] w-full py-[40px]">
          <InputSelect 
            label="Rent Duration (Monthly)"
            defaultOption="Please select rent duration"
            options={dataOption}
            onChange={e => setDuration(e.target.value)}
            required
          />
          <Button type="submit" color="primary" className="w-full">
            {isLoading ? 'Loading...' : 'Rent now'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default RentGPUModal;
