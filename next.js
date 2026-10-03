🔧 What we’ll build

A simple Base DeFi app:

Create .env.local

CDP_API_KEY=your_new_safe_key_here

⚠️ Never commit this file to GitHub
Add to .gitignore:

.env.local
🔌 3. Setup Base network + wallet connect

Edit app/page.js:

"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div style={{ padding: 20 }}>
      <h1>Base DeFi App 🚀</h1>

      {!isConnected ? (
        <button onClick={() => connect({ connector: injected() })}>
          Connect Wallet
        </button>
      ) : (
        <>
          <p>Connected: {address}</p>
          <button onClick={() => disconnect()}>Disconnect</button>
        </>
      )}
    </div>
  );
}
🌐 4. Configure Base network

Create wagmi.js:

import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
});
💸 5. Add Send Transaction

Install:

npm install ethers

Add this inside your page:

import { ethers } from "ethers";

async function sendTx() {
  if (!window.ethereum) return;

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const tx = await signer.sendTransaction({
    to: "0xReceiverAddressHere",
    value: ethers.parseEther("0.001"),
  });

  console.log(tx);
}

Add button:

<button onClick={sendTx}>Send 0.001 ETH</button>
🚀 6. Push to GitHub
git init
git add .
git commit -m "base defi app"
git branch -M main
git remote add origin https://github.com/yourusername/base-defi-app.git
git push -u origin main
🌍 7. Deploy on Vercel
Go to Vercel
Import GitHub repo
Add environment variable:
CDP_API_KEY
Deploy
🟣 8. Add Farcaster Mini App

Use Farcaster

Steps:

Go to Farcaster developer tools
Add your Vercel URL
Add manifest.json

Example:

{
  "name": "Base DeFi App",
  "url": "https://your-app.vercel.app",
  "icon": "https://your-app.vercel.app/icon.png"
}
