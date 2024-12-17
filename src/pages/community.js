import {
  AddressCopy,
  ChatContainer,
  EmailLoginModal,
  Layout,
  TextTitleWithStatus,
  Button,
} from "@/components-new";
import { useAuth } from "@/hooks/useAuth";
import { useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import {
  useActiveAccount,
  useDisconnect,
  useActiveWallet,
} from "thirdweb/react";

const CommunityPage = () => {
  const account = useActiveAccount();
  const address = account?.address;
  const { user, signout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();

  const handleDisconnect = async () => {
    try {
      if (wallet) {
        await disconnect(wallet);
        await signout(); // Call the signout function from useAuth
      }
    } catch (error) {
      console.error("Error disconnecting:", error);
    }
  };

  useEffect(() => {
    // if(!address || !user) return
    if (!user && address) {
      return;
    }
  }, [address, user]);

  return (
    <Layout>
      <TextTitleWithStatus text="Community Chat" />
      <div className="md:pt-[54px] mb-[40px] md:mb-[78px]">
        <ChatContainer />
        {wallet ? <Button onClick={handleDisconnect}>Sign Out</Button> : null}
      </div>
      {showLogin && (
        <EmailLoginModal
          walletAddress={address}
          handleClose={() => setShowLogin(false)}
        />
      )}
    </Layout>
  );
};

export default CommunityPage;
