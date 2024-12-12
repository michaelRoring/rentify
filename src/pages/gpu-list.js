import { 
    AddressCopy, 
    CardGreetings, 
    DashboardCardList, 
    EmailLoginModal, 
    Layout, 
    MyGPUList, 
    TextTitleWithStatus, 
} from '@/components-new';
import { useAuth } from '@/hooks/useAuth';
import { 
  useAddress, 
  useContract 
} from '@thirdweb-dev/react';
import { useEffect, useState } from 'react';

const GPUListPage = () => {
  const address = useAddress()
  const { user, signout } = useAuth();
  const { contract, isLoading } = useContract(process.env.NEXT_PUBLIC_CONTRACT);
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
      <TextTitleWithStatus text="Select GPU"/>
      <DashboardCardList />
      {address ?
        <>
          {isLoading ?
            <div>Loading...</div>:
            <MyGPUList 
              contract={contract}  
              address={address}  
            />
          }
        </> :
        <div className="">
          <CardGreetings />
        </div>
      }

      {showLogin && 
        <EmailLoginModal 
          walletAddress={address}
          handleClose={() => setShowLogin(false)}
        />
      }
    </Layout>
  );
}

export default GPUListPage;

