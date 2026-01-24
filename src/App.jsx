import { useState } from "react";
import { ethers } from "ethers";

function App() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [network, setNetwork] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();
    const userBalance = await provider.getBalance(userAddress);
    const net = await provider.getNetwork();

    setAddress(userAddress);
    setBalance(ethers.formatEther(userBalance));
    setNetwork(net.name);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Web3 Wallet Connector</h1>

      <button onClick={connectWallet}>
        Connect Wallet
      </button>

      {address && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Balance:</strong> {balance} ETH</p>
          <p><strong>Network:</strong> {network}</p>
        </div>
      )}
    </div>
  );
}

export default App;
