import { useAddress } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { addressShort } from "../utils/addressShort";
// import { WalletConnecButtonV2 } from ".";
import { useActiveAccount } from "thirdweb/react";

const AddressCopy = () => {
  // const address = useAddress()
  const account = useActiveAccount();
  const address = account?.address;
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;

    const setTime = setTimeout(() => {
      setIsCopied(false);
    }, 3000);

    return () => clearInterval(setTime);
  }, [isCopied]);

  return (
    <>
      {address && (
        <div className="flex gap-[10px] items-center">
          Wallet Address:
          <CopyToClipboard text={address} onCopy={() => setIsCopied(true)}>
            <button
              className="
              inline-block 
              px-[10px] 
              py-[4px] 
              rounded-[6px] 
              backdrop-blur-lg
              bg-white/10
              border
              border-white/20
              "
              title={address}
            >
              {addressShort(address)}
            </button>
          </CopyToClipboard>
          {isCopied && <span>👉 Is copied!</span>}
        </div>
      )}
    </>
  );
};

export default AddressCopy;
