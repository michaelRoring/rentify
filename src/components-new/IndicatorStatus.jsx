import { useAddress } from "@thirdweb-dev/react";
import React from "react";
import { useActiveAccount } from "thirdweb/react";

const IndicatorStatus = () => {
  // const address = useAddress()
  const account = useActiveAccount();
  const address = account?.address;
  return (
    <>
      {address ? (
        <div className="flex items-center gap-[6px] text-[16px] font-[400]">
          Status: Online
          <div className="w-[13px] h-[13px] rounded-full bg-[#0D7373]"></div>
        </div>
      ) : (
        <div className="flex items-center gap-[6px] text-[16px] font-[400]">
          Status: Offline
          <div className="w-[13px] h-[13px] rounded-full bg-[#EA3323]"></div>
        </div>
      )}
    </>
  );
};

export default IndicatorStatus;
