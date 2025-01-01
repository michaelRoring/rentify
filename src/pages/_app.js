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
import { Ethereum, PolygonAmoyTestnet } from "@thirdweb-dev/chains";

import { ProvideAuth } from "@/hooks/useAuth";
import { createThirdwebClient } from "thirdweb";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ThirdwebProvider as ThirdwebProviderV5 } from "thirdweb/react";
import { ChatProvider } from "@/context/ChatContext";

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
});

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      supportedWallets={[
        metamaskWallet({ recommended: true }),
        phantomWallet(),
        coinbaseWallet(),
        walletConnect(),
        trustWallet(),
        rainbowWallet(),
        zerionWallet(),
      ]}
      // clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
      client={client}
      activeChain={PolygonAmoyTestnet}
      // activeChain={Ethereum}
      // desiredChainId={1}
    >
      <ChatProvider>
        <ThirdwebProviderV5>
          <ProvideAuth>
            <Component {...pageProps} />
            {/* <ConnectButton client={client} /> */}
          </ProvideAuth>
        </ThirdwebProviderV5>
      </ChatProvider>
    </ThirdwebProvider>
  );
}
