"use client";

import {
  AddressCopy,
  CardGreetings,
  DashboardCardList,
  EmailLoginModal,
  Layout,
  MyGPUList,
  TextTitleWithStatus,
} from "@/components-new";
import { useAuth } from "@/hooks/useAuth";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";

const GPUListPage = () => {
  // const address = useAddress();
  const account = useActiveAccount();
  console.log("account :", account);
  const address = account?.address;
  console.log("address :", address);
  const { user, signout } = useAuth();
  console.log("user :", user);
  const { contract, isLoading, error } = useContract(
    process.env.NEXT_PUBLIC_CONTRACT
  );

  console.log("isLoading :", isLoading);
  console.log("contract :", contract);
  console.log("error :", error);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (!user && address) {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
  }, [address, user]);

  return (
    <Layout>
      <TextTitleWithStatus text="Select GPU" />
      <DashboardCardList />
      {address ? (
        <>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <MyGPUList contract={contract} address={address} />
          )}
        </>
      ) : (
        <div className="">
          <CardGreetings />
        </div>
      )}

      {showLogin && (
        <EmailLoginModal
          walletAddress={address}
          handleClose={() => setShowLogin(false)}
        />
      )}
    </Layout>
  );
};

export default GPUListPage;
