import { 
  Layout,
  AddressCopy, 
  MyGPUList, 
  TextTitleWithStatus, 
  WalletConnecButton, 
  EmailLoginModal
} from '@/components-new';
import { useAuth } from '@/hooks/useAuth';
import { 
  useAddress, 
  useContract 
} from '@thirdweb-dev/react';
import { useEffect, useState } from 'react';



const MyOrderPage = () => {
  const address = useAddress()
  const { contract, isLoading } = useContract(process.env.NEXT_PUBLIC_CONTRACT);
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
      <TextTitleWithStatus text="My Order"/>
      {address ?
        <>
          {isLoading ?
            <div>Loading...</div>:
            <div className="py-[20px] md:py-[40px]">
                <MyGPUList 
                contract={contract}  
                address={address}  
                myOrder
              />
            </div>
          }
        </> :
        <div className="text-center">
          <WalletConnecButton />
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

export default MyOrderPage;

