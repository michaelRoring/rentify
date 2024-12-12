import {
  Layout,
  WalletConnecButton,
  TextTitleWithStatus,
  AddressCopy,
  DashboardCardList,
  CardGreetings,
  ResumeCardList,
  EmailLoginModal,
  CardTotal,
  IndicatorStatus,
  TotalUserProgressBar,
} from "@/components-new";
import { useAuth } from "@/hooks/useAuth";
import { useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import ImageMap from "../../public/image-map.png";
import { useActiveAccount, useWalletBalance } from "thirdweb/react";

import { createThirdwebClient } from "thirdweb";
import { ThirdwebProvider, ConnectButton } from "thirdweb/react";
import ChatBot from "@/components/Chatbot";

const HomePage = () => {
  // const address = useAddress();
  const account = useActiveAccount();
  const address = account?.address;
  const { user, signout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    console.log("user :", user);
    if (!address) return;

    if (!user) {
      setShowLogin(true);
      return;
    }

    setShowLogin(false);
  }, [address, user]);

  return (
    <Layout>
      {/* <ConnectButton client={client} /> */}
      <TextTitleWithStatus text="Dashboard" />
      <DashboardCardList />

      <div className="flex flex-col gap-[40px] md:gap-[78px] mb-[40px]">
        <TextTitleWithStatus text="Live Server" withoutIndicator />
        <div className="w-[90%] mx-auto">
          <div className="relative w-full">
            <Image
              className="w-full animate-move-left-right"
              src={ImageMap}
              alt="image-map"
              w={500}
              h={300}
            />
          </div>
          <div className="flex justify-center">
            <WalletConnecButton />
          </div>
        </div>
        <div className="w-[80%] mx-auto flex flex-col gap-[40px] md:gap-[78px] mb-[40px]">
          <TotalUserProgressBar />
          {/* <ResumeCardList /> */}
        </div>
      </div>

      <ChatBot />
      {/* {showLogin && (
        <EmailLoginModal
          walletAddress={address}
          handleClose={() => setShowLogin(false)}
        />
      )} */}
    </Layout>
  );
};

export default HomePage;
