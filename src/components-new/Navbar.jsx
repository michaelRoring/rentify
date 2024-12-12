import React from "react";
import Icon from "./Icon";
import Image from "next/image";
import userImage from "../../public/user-image.svg";
import { useAddress } from "@thirdweb-dev/react";
import AddressCopy from "./AddressCopy";
import { useActiveAccount } from "thirdweb/react";

const Navbar = () => {
  // const address = useAddress();
  const account = useActiveAccount();
  const address = account?.address;
  return (
    <nav className="flex justify-end px-[20px] md:pl-[100px] md:pr-[29px] md:py-[29px] min-h-[79px]">
      {address && (
        <div className="flex items-center gap-[18px]">
          <Icon name="icon-notification" size={20} />
          <AddressCopy />
          {/* <div className="flex items-center gap-[10px]">
            <Image src={userImage} alt={userImage} width={24} height={24}/>
            <span>Farren</span>
          </div> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
