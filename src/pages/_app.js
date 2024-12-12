"use client";
import "@/styles/globals.css";
import {
  // ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  phantomWallet,
  trustWallet,
  rainbowWallet,
  zerionWallet,
  safeWallet,
  ChainId,
} from "@thirdweb-dev/react";
import { PolygonAmoyTestnet } from "@thirdweb-dev/chains";
import { ProvideAuth } from "@/hooks/useAuth";

import { createThirdwebClient } from "thirdweb";
import { ThirdwebProvider, ConnectButton } from "thirdweb/react";
// import { initializeVectorStore } from "@/utils/vectorStore";
// import { useEffect } from "react";

console.log(
  "process.env.NEXT_PUBLIC_CLIENT_ID",
  process.env.NEXT_PUBLIC_CLIENT_ID
);
// console.log('PolygonAmoyTestnet', PolygonAmoyTestnet);
// console.log('ChainId', ChainId);
export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
});

export default function App({ Component, pageProps }) {
  // useEffect(() => {
  //   initializeVectorStore().catch(console.error);
  // }, []);
  return (
    <ThirdwebProvider
    // supportedWallets={[
    //   metamaskWallet({ recommended: true }),
    //   phantomWallet(),
    //   coinbaseWallet(),
    //   walletConnect(),
    //   trustWallet(),
    //   rainbowWallet(),
    //   zerionWallet(),
    // ]}
    // clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
    // activeChain={PolygonAmoyTestnet}
    >
      <ProvideAuth>
        <Component {...pageProps} />
        {/* <ConnectButton client={client} /> */}
      </ProvideAuth>
    </ThirdwebProvider>
  );
}
