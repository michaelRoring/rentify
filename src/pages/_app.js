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
// import {
//   metamaskWallet,
//   coinbaseWallet,
//   walletConnect,
// } from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";
// import { ThirdwebProvider, ConnectButton } from "thirdweb/react";
// import { ThirdwebProvider, ConnectButton } from "@thirdweb-dev/react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ThirdwebProvider as ThirdwebProviderV5 } from "thirdweb/react";

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
      // desiredChainId={1}
    >
      <ThirdwebProviderV5>
        <ProvideAuth>
          <Component {...pageProps} />
          {/* <ConnectButton client={client} /> */}
        </ProvideAuth>
      </ThirdwebProviderV5>
    </ThirdwebProvider>
  );
}
