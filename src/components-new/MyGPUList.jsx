import { useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import CardItem from "./CardItem";
import { useEffect, useState } from "react";
import axios from "axios";

const marketCurrency = process.env.NEXT_PUBLIC_MARKET_CURRENCY.split(",");
const symbolFrom = process.env.NEXT_PUBLIC_COIN_SYMBOL;
const symbolTo = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL;
const convertFrom = marketCurrency[0];
const convertTo = marketCurrency[1];

const MyGPUList = ({ contract, address, myOrder, ...props }) => {
  const { data: getAllGPUs, isLoading } = useContractRead(
    contract,
    "getAllGPUs"
  );
  const [marketPrice, setMarketPrice] = useState(null);

  useEffect(() => {
    if (marketPrice) return;
    const getMarketPrice = async () => {
      if (!convertFrom || !convertTo) return;
      try {
        const { data } = await axios.get(
          `/api/market-price?from=${convertFrom}&to=${convertTo}`
        );
        setMarketPrice(data.price);
      } catch (error) {
        console.log(error);
      }
    };

    getMarketPrice();
  }, [marketPrice]);

  console.log("getAllGPUs :", getAllGPUs);
  const formatGPUsData = getAllGPUs?.map((item, index) => ({
    id: index + 1,
    name: item.name,
    types: item.types,
    vCPUs: item.vCPUs.toNumber(),
    vCPUsUnit: item.vCPUsUnit.toNumber(),
    bandwidth: item.bandwidth.toNumber(),
    available: item.available,
    price: ethers.utils.formatEther(item.price.toString()),
    rentPrice: [
      {
        period: "day",
        amount: ethers.utils.formatEther(item.rentPrice.day.toString()),
      },
      {
        period: "week",
        amount: ethers.utils.formatEther(item.rentPrice.week.toString()),
      },
      {
        period: "month",
        amount: ethers.utils.formatEther(item.rentPrice.month.toString()),
      },
    ],
    owner: item.owner,
    renter: item.renter,
    isBought: item.isBought,
  }));
  console.log("formatGPUsData :", formatGPUsData);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] mb-[40px]">
          {myOrder ? (
            <>
              {formatGPUsData
                .filter(
                  ({ available, owner, renter }) =>
                    (!available && owner == address) || renter == address
                )
                .map((item, index) => (
                  <CardItem
                    key={index}
                    contract={contract}
                    marketPrice={marketPrice}
                    symbol={{ symbolFrom, symbolTo }}
                    {...item}
                  />
                ))}
            </>
          ) : (
            <>
              {formatGPUsData.map((item, index) => (
                <CardItem
                  key={index}
                  contract={contract}
                  marketPrice={marketPrice}
                  symbol={{ symbolFrom, symbolTo }}
                  {...item}
                  buttonAction
                />
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MyGPUList;
