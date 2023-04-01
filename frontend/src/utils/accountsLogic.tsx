import { useEffect, useState } from "react";
import { ethers } from "ethers";

declare let window: any;


export type AccountInfo = {
  currentAccount: string | undefined;
  balance: string | undefined;
  chainId: number | undefined;
  chainName: string | undefined;
  connectMetaMask?: () => Promise<void>;
  disconnectMetaMask?: () => void;
};


// hook to manage account info
export const useAccountInfo = () => {
  const connectMetaMask = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    try {
      await provider.send("eth_requestAccounts", []);
      getCurrentAccount();
    } catch (e) {
      console.log(e);
    }
  };

  const disconnectMetaMask = () => {
    setAccountInfo({
      currentAccount: undefined,
      balance: undefined,
      chainId: undefined,
      chainName: undefined,
      connectMetaMask: connectMetaMask,
      disconnectMetaMask: disconnectMetaMask,
    });
  };
  // state is initialized with undefined values
  const [accountInfo, setAccountInfo] = useState<AccountInfo>({
    currentAccount: undefined,
    balance: undefined,
    chainId: undefined,
    chainName: undefined,
    connectMetaMask: connectMetaMask,
    disconnectMetaMask: disconnectMetaMask,
  });

  const getCurrentAccount = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const accounts = await provider.listAccounts();
    if (accounts.length > 0) {
      const currentAccount = accounts[0];
      setAccountInfo((prevState) => ({
        ...prevState,
        currentAccount,
      }));

      provider
        .getBalance(currentAccount)
        .then((balance) => {
          const formattedBalance = ethers.utils.formatEther(balance);
          setAccountInfo((prevState) => ({
            ...prevState,
            balance: formattedBalance,
          }));
        })
        .catch((e) => console.log(e));

      provider
        .getNetwork()
        .then((network) => {
          setAccountInfo((prevState) => ({
            ...prevState,
            chainId: network.chainId,
            chainName: network.name,
          }));
        })
        .catch((e) => console.log(e));
    }
  };

  return { ...accountInfo, connectMetaMask, disconnectMetaMask };
};
