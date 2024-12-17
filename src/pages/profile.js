import {
  AddressCopy,
  CardGreetings,
  CardSummary,
  DashboardCardList,
  Layout,
  TextTitleWithStatus,
} from "@/components-new";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";

const ProfilePage = () => {
  const account = useActiveAccount();
  const address = account?.address;
  const { user, signout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
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
    </Layout>
  );
};

export default ProfilePage;
