import {
  ConnectWallet,
  darkTheme,
  useAddress,
  // useDisconnect,
  // useActiveWallet,
} from "@thirdweb-dev/react";
import Button from "./Button";
import { generateAvatarURL } from "@/utils/generateAvatarUrl";
import { useEffect } from "react";
import { axios } from "axios";

import {
  useDisconnect,
  useActiveWallet,
  useActiveAccount,
} from "thirdweb/react";
import { ThirdwebProvider, ConnectButton } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { useAuth } from "@/hooks/useAuth";

const customDarkTheme = darkTheme({
  fontFamily: "Nohemi, sans-serif",
  colors: {
    modalBg: "#2929295c",
    accentText: "#0D7373",
    borderColor: "#4b4b4b",
    // ... etc
  },
});

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
});

const WalletConnecButton = () => {
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();
  const account = useActiveAccount();
  const address = account?.address;
  const { user, signout } = useAuth();

  const handleDisconnect = async () => {
    try {
      if (wallet) {
        await disconnect(wallet);
        await signout();
      }
    } catch (error) {
      console.error("Error disconnecting:", error);
    }
  };

  useEffect(() => {
    if (!address) return;

    const checkAndAddUser = async () => {
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            wallet_address: address,
          }),
        });

        const responseJson = await response.json();

        localStorage.setItem("token", responseJson.token);

        if (response?.data?.user) {
          console.log("User logged in or created:", response.data.user);
        }
      } catch (error) {
        console.error("Error checking and adding user:", error);
      }
    };

    if (address) {
      checkAndAddUser();
    }
  }, [address]);

  return (
    <>
      <div>
        {!account?.address ? (
          <ConnectButton client={client} />
        ) : (
          <div className="">
            <Button
              color="primary"
              onClick={handleDisconnect}
              className="mt-[10px]"
            >
              Disconnected Wallet
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default WalletConnecButton;
