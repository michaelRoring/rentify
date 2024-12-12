import React, { useEffect, useState } from 'react';
import CardSummary from './CardSummary';
import axios from 'axios';

const DashboardCardList = () => {

  const [ethValue, setEthValue] = useState(0);

  useEffect(() => {
   const getEthValue = async () => {
    try {
      const {data} = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      setEthValue(data.ethereum.usd)
    }
    catch(error) {
      console.log(error)
    }
   }

   getEthValue()
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] md:pt-[54px] mb-[40px] md:mb-[70px]">
        <CardSummary 
          type="rent"
          title="$RENT Price"
          total="$0.23"
        />
        <CardSummary 
          type="fdv"
          title="FDV"
          total="$23,252,522"
        />
        <CardSummary 
          type="eth"
          title="ETH Price"
          total={`$${ethValue}`}
        />
      </div>
  );
}

export default DashboardCardList;
