// import {createThirdwebClient} from 'thirdweb'
// import {
//   ConnectButton,
//   darkTheme
// } from "thirdweb/react";
// import {
//   createWallet,
//   walletConnect,
// } from "thirdweb/wallets";

// const client = createThirdwebClient({
//   clientId: "9586e8e92a51a5405321e5b1eda04c9d",
// });

// const wallets = [
//   createWallet("io.metamask"),
//   createWallet("com.coinbase.wallet"),
//   walletConnect(),
//   createWallet("app.phantom"),
// ];

// const theme = darkTheme({
//   colors: {
//     accentText: "#0D7373",
//     accentButtonBg: "#0D7373",
//     modalBg: "#ffffff20",
//     dropdownBg: "#ffffff20",
//     primaryButtonBg: "#0D7373",
//     accentButtonText: "#ededef",
//     primaryButtonText: "#FFFFFF",
//   },
// })


const WalletConnecButtonV2 = () => {
  return (
    <div>
      {/* <ConnectButton
        client={client}
        wallets={wallets}
        theme={theme}
        connectButton={{
          label: "Connect Wallet",
        }}
        connectModal={{
          size: "wide",
          title: "Connect Wallet",
          titleIcon:
            "https://ordexhaust.com/ipfs/uploads/rentify_logo.svg",
          welcomeScreen: {
            img: {
              src: "https://ordexhaust.com/ipfs/uploads/rentify_logo.svg",
              width: 150,
              height: 150,
            },
          },
        }}
      /> */}
    </div>
  );
}

export default WalletConnecButtonV2;
