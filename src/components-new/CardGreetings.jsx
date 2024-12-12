import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import userGlassImage from '../../public/user-glass-image.svg';
import { WalletConnecButton } from '.';
import { useAddress } from '@thirdweb-dev/react';
import firebase from '@/utils/firebaseConfig'
import { useAuth } from '@/hooks/useAuth';

const CardGreetings = (props) => {
  const address = useAddress()
  const {user} = useAuth()
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if(!address || !user) return;
    try {
      const usersRef = firebase.database().ref(`users/${address}`);
      usersRef.once('value', (snapshot) => {
        const usersData = snapshot.val();
        console.log('usersData', usersData);
        setCurrentUser(usersData)
      })
    }
    catch(error) {
      console.log(error);
    }
  }, [address, user]);

  return (
    <div className="
      border
      border-[#ffffff20]
      rounded-[6px]
      backdrop-blur-sm bg-[#ffffff07]
      flex
      gap-[16px]
      md:gap-[50px]
      md:px-[49px]
      md:py-[40px]
      p-[16px]
    ">
      <div className="relative w-[60px] h-[60px] md:w-[100px] md:h-[100px] grow">
        {currentUser?
          <div className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] rounded-full shadow overflow-hidden bg-white/20">
            <Image src={currentUser.avatar} alt="user-image" width={100} height={100} />
          </div> :
          <Image src={userGlassImage} alt="user-image" width={100} height={100} />
        }
      </div>
      <div className="w-full">
        {address ?
        <div className="">
          <div className="text-[24px] font-[500] md:mb-[14px]">Wallet Connected</div>
          <p className="font-inter text-[#ffffff70] md:mb-[6px]">Yout wallet is connected in this dapps.</p>
        </div> :
        <div>
          <div className="text-[24px] font-[500] mb-[14px]">Hello there, Welcome aboard! </div>
          <p className="font-inter text-[#ffffff70] mb-[20px]">Unlock more rewards and level up faster by simply referring friends. Each referral earns you points towards exclusive perks. Start sharing and start earning today!</p>
        </div>
      }
        <div>
          <WalletConnecButton />
        </div>
      </div>
    </div>
  );
}

export default CardGreetings;
