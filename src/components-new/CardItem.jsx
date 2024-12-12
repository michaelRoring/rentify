import Image from 'next/image';
import React, {useState, useEffect} from 'react';
import imageCardBg from '../../public/bg-card.svg'
import BadgeIndicator from './BadgeIndicator';
import Button from './Button';
import axios from 'axios';
import { ethers } from 'ethers';
import { toEther, toWei } from '@thirdweb-dev/sdk';
import RentGPUModal from './RentGPUModal';
import { convertPriceToCurrency } from '@/utils/convertPriceToCurrency';
import { sendPurchaseTemplate } from '@/lib/mailTheme/sendPurchaseTemplate';
import { useAddress } from '@thirdweb-dev/react';
import { useAuth } from '@/hooks/useAuth';
import { sendRentTemplate } from '@/lib/mailTheme/sendRentTemplate';
import RentGPUModalNew from './RentGPUModalNew';


const CardItem = ({contract, ...props}) => {
  const address = useAddress()
  const {user} = useAuth()
  const [isLoadingBuyGPU, setIsLoadingBuyGPU] = useState(false);
  const [isLoadingRentGPU, setIsLoadingRentGPU] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRent, setSelectedRent] = useState(null);
  
  const handleBuyGPU = async (item) => {
    const {id, price} = item;
    if(!contract || !id || !price) return;

    const _parsePrice = ethers.utils.parseUnits(price, "ether")
    setIsLoadingBuyGPU(true)

    try {
      const tx = await contract.call("buyGPU", [id], {value: _parsePrice})
      console.log('tx', tx);
      
      if(tx) {
        const transactionURL = `${process.env.NEXT_PUBLIC_TRANSACTION_SCAN_URL}/${tx.receipt.transactionHash}`
        await sendEmail(item, address, user, transactionURL)
      }
    }
    catch(error) {
      console.log(error);
    }
    finally {
      setIsLoadingBuyGPU(false)
    }
  }

  const handleRentGPU = async (_item, _rentPrice, _rentDurationId, _rentDurationPeriod) => {
    if(!contract || !_item.id || !_rentPrice || _rentDurationId < 0) return;
  
    const _parsePrice = ethers.utils.parseUnits(_rentPrice, "ether")
    const _rentDuration = `1 ${_rentDurationPeriod}`
    setIsLoadingRentGPU(true)

    try {
      const tx = await contract.call("rentGPU", [_item.id, _rentDurationId], {value: _parsePrice})
      console.log('tx', tx);

      if(tx) {
        const transactionURL = `${process.env.NEXT_PUBLIC_TRANSACTION_SCAN_URL}/${tx.receipt.transactionHash}`
        await sendEmail(
          {..._item, rentPrice: _rentPrice}, 
          address, 
          user, 
          transactionURL,
          _rentDuration,
        )
        setShowModal(false)
      }
    }
    catch(error) {
      console.log(error);
    }
    finally {
      setIsLoadingRentGPU(false)
    }
  }

  const handleSubmitRent = async (selectedRentPrice) => {
    if(!selectedRentPrice) return;
    const { id, amount, period } = selectedRentPrice;

    console.log('id', id);
    console.log('amount', amount);
    console.log('period', period);
    await handleRentGPU(selectedRent, amount, id, period)
  }

  const handleOpenModal = (item) => {
    console.log('item', item);
      if(showModal) {
        setSelectedRent(null)
        setShowModal(!showModal)
      }
      else {
        setSelectedRent(item)
        setShowModal(!showModal)
      }
  }

  const sendEmail = async (_item, _address, _users, _transactionURL, _rentDuration) => {
    const {displayName: customerName, email: customerEmail} = _users
    const customerWallet = _address
    const senderName= process.env.NEXT_PUBLIC_MAIL_SENDER_NAME;
    const senderContact= process.env.NEXT_PUBLIC_MAIL_SENDER_CONTACT;
    const senderEmail= process.env.NEXT_PUBLIC_MAIL_SENDER_EMAIL;

    let mailTemplate;

    if(_rentDuration) {
      mailTemplate = sendRentTemplate(
        customerName,
        customerWallet,
        senderName,
        senderContact,
        senderEmail,
        _transactionURL,
        _rentDuration,
        _item,
      )
    }
    else {
      mailTemplate = sendPurchaseTemplate(
        customerName,
        customerWallet,
        senderName,
        senderContact,
        senderEmail,
        _transactionURL,
        _item,
      )
    }
    

    await axios.post(`/api/send-mail`, {
      subject: 'Rentify - Successful purchase', 
      to: customerEmail, 
      text: '', 
      html: mailTemplate
    })
  }

  return (
    <>
      {props &&
        <div className="
          relative 
          w-full
          border
          border-[#ffffff20]
          rounded-[6px]
          backdrop-blur-md bg-[#ffffff07]
          flex
          flex-col
          items-center
          overflow-hidden
          shadow-lg
          shadow-[#32B5B520]
          
        ">
          <div className="absolute w-full top-0 left-0 z-0">
            <Image 
              src={imageCardBg} 
              alt="fdv"
              width={0}
              height={0}
              style={{ width: '100%', height: 'auto' }} // optional
              priority
            />
          </div>
          <div className="w-full flex flex-col gap-[20px] card-inner-shadow p-[20px] z-[1]">
            <div className="flex flex-col gap-[2px]">
              <div className="text-[14px]">{props.name}</div>
              <div className="text-[24px] font-inter font-semibold">{props.types}</div>
            </div>
            <div className="flex justify-between font-inter text-[14px]">
              <div className="flex flex-col gap-[12px]">
                <div>{props.vCPUs.toString()} vCPUs</div>
                <div className="text-center">{props.vCPUsUnit}</div>
              </div>
              <div className="flex flex-col gap-[12px] w-[50%]">
                <div className="flex justify-between">
                  <div className="font-bold">CPU</div>
                  <div className="font-bold">GPU</div>
                </div>
                <div className="text-center">{props.bandwidth} TB Bandwith</div>
              </div>
            </div>
            <div>
              <BadgeIndicator status={props.available}>
                {props.available ? 'Available' : 'Unavailable'}
              </BadgeIndicator>
            </div>
            <div className="grid grid-cols-2 items-center">
              <div className="flex flex-col gap-[8px]">
                <div className="text-[12px] text-white/50">Price /month</div>
                <div>
                  <div className="text-[20px] font-[500]">                
                    {props.price}{" "}
                    <span className="uppercase">{props.symbol.symbolFrom}</span>
                  </div>
                  <div className="text-[12px] text-white/70">
                    {"$"}{convertPriceToCurrency(props.price, props.marketPrice)}{" "}
                    <span className="uppercase">{props.symbol.symbolTo}</span>
                  </div>
                </div>
              </div>
              {props.buttonAction &&
                <div className="flex justify-end gap-[10px]">
                  <Button color="primary" disabled={!props.available || isLoadingBuyGPU} onClick={() => handleBuyGPU(props)}>
                    {isLoadingBuyGPU ? 'Loading...' : 'Buy'}
                  </Button>
                  <Button color="secondary" disabled={!props.available || isLoadingBuyGPU} onClick={() => handleOpenModal(props)}>
                    Rent
                  </Button>
                </div>
              }
            </div>
          </div>
        </div>
      }

      {showModal &&
        <RentGPUModalNew 
          symbol={props.symbol}
          marketPrice={props.marketPrice}
          rentPrice={selectedRent.rentPrice}
          handleClose={handleOpenModal}
          handleSubmitRent={handleSubmitRent}
          isLoading={isLoadingRentGPU}
        />
      }
    </>
  );
}

export default CardItem;
