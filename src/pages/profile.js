import {
  AddressCopy,
  CardGreetings,
  CardSummary,
  DashboardCardList,
  EmailLoginModal,
  Layout,
  TextTitleWithStatus,
} from "@/components-new";
import { useAuth } from "@/hooks/useAuth";
import { useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";

const ProfilePage = () => {
  // const address = useAddress()
  const account = useActiveAccount();
  const address = account?.address;
  const { user, signout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // if(!address || !user) return
    console.log("user :", user);
    console.log("address :", address);
    if (!user && address) {
      setShowLogin(true);
      return;
    }
    setShowLogin(false);
  }, [address, user]);

  return (
    <Layout>
      <TextTitleWithStatus text="Profile" />
      <DashboardCardList />
      <div className="grid grid-cols-1 mb-[40px]">
        <CardGreetings />
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

export default ProfilePage;
