// import React from 'react';
// import Button from './Button';
// import { useEffect, useState } from 'react';
// import {
//   useMetamask,
//   useWalletConnect,
//   useCoinbaseWallet,
//   useAddress,
// } from '@thirdweb-dev/react';
// // import { useAddress, useConnectionStatus, useDisconnect, useWeb3 } from '@thirdweb-dev/react';
// import { PhantomWallet } from "@thirdweb-dev/wallets";
// import Icon from './Icon';
// import { createThirdwebClient } from "thirdweb";
// import { ConnectButton, useConnect } from "thirdweb/react";
// import { createWallet, injectedProvider } from "thirdweb/wallets";

// const clientId = 'a313fde23b1645355d74fb7c1c794158'
// const client = createThirdwebClient({ clientId });


const ConnectWallet = (props) => {
  // const { connect, isConnecting, error } = useConnect();
  // const address = useAddress()
  // console.log('address', address);
  
  // const connectWithPhantom = new PhantomWallet();
  // const connectWithMetamask = useMetamask();
  // const connectWithWalletConnect = useWalletConnect();
  // const connectWithCoinbaseWallet = useCoinbaseWallet();
  // const [loading, setLoading] = useState({
  //   metamask: false,
  //   coinbase: false,
  //   phantom: false,
  //   walletconnect: false
  // });

  // const handleConnect = async (wallet) => {
  //   setLoading(prev => ({...prev, [wallet]: true}));
  //   try {
  //     if(wallet == 'metamask') {
  //       await connectWithMetamask()
  //     }
  //     else if(wallet == 'coinbase') {
  //       await connectWithCoinbaseWallet()
  //     }
  //     else if(wallet == 'phantom') {
  //       connectWithPhantom.connect()
  //     }
  //     else if(wallet == 'walletconnect') {
  //       await connectWithWalletConnect()
  //     }
  //     else {
  //       alert('Wallet not found')
  //     }
  //     // if(wallet == 'phantom') {
  //     //   await connection.connect()
  //     // }
  //     // else {
  //     //   await connection();
  //     // }
  //   } catch (error) {
  //     console.error('Connection error', error);
  //   } finally {
  //     setLoading(prev => ({...prev, [wallet]: false}));;
  //   }
  // };

  // const walletConnection = async (provider) => {
  //   if (injectedProvider(provider)) {
  //     console.log(injectedProvider(provider));
  //     connect(async () => {
  //       const wallet = createWallet(provider);
  //       await wallet.connect({ client });
  //       console.log('wallet', wallet.account);
  //       return wallet;
  //     });
  //   }
  //   // show error message to user that wallet is not installed
  //   else {
  //     alert("wallet is not installed");
  //   }
  // }

  // const handleConnectWallet = async (walletName) => {
  //   if(walletName == 'metamask') {
  //     await walletConnection("io.metamask")
  //   }
  //   else if(walletName == 'coinbase') {
  //     await walletConnection("com.coinbase.wallet")
  //   }
  //   else if(walletName == 'phantom') {
  //        walletConnection("app.phantom")
  //   }
  //   else if(walletName == 'walletconnect') {
  //     await walletConnection("walletConnect")
  //   }
  //   else {
  //     alert('Wallet not found!')
  //   }
  // }

  return (
    <></>
    // <div className="fixed left-0 top-0 w-full h-full  bg-[#00000070] flex justify-center items-center">
    //   <div className="
    //     relative 
    //     w-full
    //     border
    //     border-[#ffffff20]
    //     rounded-[6px]
    //     backdrop-blur-md bg-[#ffffff07]
    //     flex
    //     flex-col
    //     items-center
    //     overflow-hidden
    //     shadow-lg
    //     shadow-[#32B5B520]
    //     max-w-[22%]
    //     min-h-[350px]
    //     py-[20px]
    //     px-[50px]
    //   ">
    //     <button className="absolute right-[16px] top-[16px]" onClick={props.handleClose}>
    //       <Icon name="icon-close"/>
    //     </button>
    //     <div className="text-[24px] front-[500] mb-[20px]">Connect Wallet</div>
    //     <div className="flex flex-col gap-[6px] w-full mb-[20px]">
    //       <Button 
    //         color="primary" 
    //         className="!w-full" 
    //         // onClick={() => handleConnectWallet('metamask')} 
    //         onClick={() => handleConnect('metamask')} 
    //         disabled={loading.metamask}
    //       >
    //         {loading.metamask ? 'Connecting MetaMask...' : 'MetaMask'}
    //       </Button>
    //       <Button 
    //         color="primary" 
    //         className="!w-full" 
    //         // onClick={() => handleConnectWallet('coinbase')} 
    //         onClick={() => handleConnect('coinbase')} 
    //         disabled={loading.coinbase}
    //       >
    //         {loading.coinbase ? 'Connecting Coinbase...' : 'Coinbase'}
    //       </Button>
    //       <Button 
    //         color="primary" 
    //         className="!w-full" 
    //         // onClick={() => handleConnect('phantom')} 
    //         onClick={() => handleConnectWallet('phantom')} 
    //         disabled={loading.phantom}
    //       >
    //         Phantom
    //         {/* {loading.phantom ? 'Connecting Phantom...' : 'Phantom'} */}
    //       </Button>
    //       <Button 
    //         color="primary" 
    //         className="!w-full" 
    //         disabled={loading.walletconnect}
    //         // onClick={() => handleConnectWallet('walletconnect')} 
    //         onClick={() => handleConnect('walletconnect')} 
    //       >
    //         {loading.walletconnect ? 'Connecting Wallet Connect...' : 'Wallet Connect'}
    //       </Button>
    //     </div>
    //     <div>{"I don't have a wallet"}</div>
    //   </div>
    // </div>
  );
}

export default ConnectWallet;
