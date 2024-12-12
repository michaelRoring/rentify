import {
  ConnectWallet,
  darkTheme,
  useAddress,
  // useDisconnect,
  // useActiveWallet,
} from "@thirdweb-dev/react";
import Button from "./Button";
import firebase from "@/utils/firebaseConfig";
import { generateAvatarURL } from "@/utils/generateAvatarUrl";
import { useEffect } from "react";

import {
  useDisconnect,
  useActiveWallet,
  useActiveAccount,
} from "thirdweb/react";
import { ThirdwebProvider, ConnectButton } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";

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
  console.log("account :", account);
  // const address = account?.address;
  const address = "asfasfaf";

  const handleDisconnect = async () => {
    try {
      if (wallet) {
        await disconnect(wallet);
      }
    } catch (error) {
      console.error("Error disconnecting:", error);
    }
  };

  useEffect(() => {
    if (!address) return;

    const checkAndAddUser = async () => {
      try {
        const usersRef = firebase.database().ref("users");
        const snapshot = await usersRef.child(address).once("value");
        const userData = snapshot.val();

        if (!userData) {
          // Jika address wallet belum terdaftar, tambahkan user baru
          const newUser = {
            name: address, // Gunakan address sebagai default name
            avatar: generateAvatarURL(), // Avatar default
            created_at: firebase.database.ServerValue.TIMESTAMP,
          };

          await usersRef.child(address).set(newUser);
          // Setelah menambahkan user baru, dapatkan data pengguna tersebut
          const newUserSnapshot = await usersRef.child(address).once("value");
          const newUserData = newUserSnapshot.val();
          // setCurrentUser(({...newUserData, address})); // Mengatur currentUser dengan data pengguna yang baru ditambahkan

          return;
        }

        // setCurrentUser(({...userData,  address})); // Mengatur currentUser dengan data pengguna yang baru ditambahkan
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
