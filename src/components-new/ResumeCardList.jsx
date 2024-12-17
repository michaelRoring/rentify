import React, { useEffect, useState } from "react";
import { CardTotal } from ".";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import axios from "axios";
import { animateCounter } from "@/utils/animatedCounter";
import { useActiveAccount } from "thirdweb/react";

const intialRentStats = {
  averageRentCost: 0,
  averageRentDuration: 0,
  totalNodes: 0,
  totalRentDuration: 0,
};

const ResumeCardList = () => {
  const account = useActiveAccount();
  const address = account?.address;
  const { contract, isLoading: isLoadingContract } = useContract(
    process.env.NEXT_PUBLIC_CONTRACT
  );
  const { data: getAllGPUs, isLoading: isLoadingGPUs } = useContractRead(
    contract,
    "getAllGPUs"
  );

  const [averageRentCost, setAverageRentCost] = useState(0);
  const [averageRentDuration, setAverageRentDuration] = useState(0);
  const [totalNodes, setTotalNodes] = useState(0);
  const [totalRentDuration, setTotalRentDuration] = useState(0);
  const [isLoadingRentStats, setIsLoadingRentStats] = useState(true);

  useEffect(() => {
    const getRentStats = async () => {
      try {
        const { data } = await axios.get("/api/rent-stats");
        const {
          averageRentCost,
          averageRentDuration,
          totalNodes,
          totalRentDuration,
        } = data;
        animateCounter(averageRentCost, setAverageRentCost);
        animateCounter(averageRentDuration, setAverageRentDuration);
        animateCounter(totalNodes, setTotalNodes);
        animateCounter(totalRentDuration, setTotalRentDuration);
      } catch (error) {
        console.log("error: ", error);
      }

      setIsLoadingRentStats(false);
    };
    getRentStats();
  }, []);

  const totalGPU = getAllGPUs?.length || 0;
  const totalRent =
    getAllGPUs?.filter((item) => item.renter != ethers.constants.AddressZero)
      ?.length || 0;

  return (
    <>
      {isLoadingGPUs && isLoadingRentStats ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
          <CardTotal title="Total Nodes" content={totalNodes} />
          <CardTotal title="Total GPU" content={totalGPU} />
          <CardTotal title="Total Rent" content={totalRent} />
          <CardTotal
            title="Average Rent Duration"
            content={`${averageRentDuration}hrs`}
          />
          <CardTotal
            title="Total Rent Duration"
            content={`${totalRentDuration}hrs`}
          />
          <CardTotal
            title="Average Rent Cost"
            content={`${averageRentCost}hrs`}
          />
        </div>
      )}
    </>
  );
};

export default ResumeCardList;
