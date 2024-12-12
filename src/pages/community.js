import { 
  AddressCopy,  
  ChatContainer, 
  EmailLoginModal, 
  Layout, 
  TextTitleWithStatus,
  Button
} from '@/components-new';
import { useAuth } from '@/hooks/useAuth';
import { useAddress } from '@thirdweb-dev/react';
import { useEffect, useState } from 'react';

const CommunityPage = () => {
  const address = useAddress()
  const { user, signout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // if(!address || !user) return
    if(!user && address) {
      setShowLogin(true) 
      return;
    }
    setShowLogin(false)
  }, [address, user]);

  return (
    <Layout>
      <TextTitleWithStatus text="Community Chat"/>
      <div className="md:pt-[54px] mb-[40px] md:mb-[78px]">
        <ChatContainer />
        {/* <Button onClick={signout}>Sign Out</Button> */}
      </div>
      {showLogin && 
        <EmailLoginModal 
          walletAddress={address}
          handleClose={() => setShowLogin(false)}
        />
      }
    </Layout>
  );
}

export default CommunityPage;
