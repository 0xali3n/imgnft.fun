import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { WalletProvider } from "@suiet/wallet-kit";
import { WalletKitProvider } from "@mysten/wallet-kit";
import "@suiet/wallet-kit/style.css";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WalletProvider>
    <WalletKitProvider>
      <App />
    </WalletKitProvider>
    </WalletProvider>
  </StrictMode>
);
