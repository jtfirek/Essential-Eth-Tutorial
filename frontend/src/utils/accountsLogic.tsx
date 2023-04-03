import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { provider, setProviderandSigner } from "./contractFunctions";




export type AccountInfo = {
  currentAccount: string | undefined;
  balance: string | undefined;
  chainId: number | undefined;
  chainName: string | undefined;
  myTokenBalance: string | undefined;
  WETHBalance: string | undefined;
  liquidityTokenBalance: string | undefined;
  connectMetaMask?: () => Promise<void>;
  disconnectMetaMask?: () => void;
  getCurrentAccount?: (tokenUpdate?: string, liquityUpdate?: string, wethUpdate?: string) => void;
};


// hook to manage account info
export const useAccountInfo = () => {
  const connectMetaMask = async () => {
    await setProviderandSigner();
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
      myTokenBalance:undefined,
      WETHBalance: undefined,
      liquidityTokenBalance: undefined,
      connectMetaMask: connectMetaMask,
      disconnectMetaMask: disconnectMetaMask,
      getCurrentAccount: getCurrentAccount,
    });
  };

    const getCurrentAccount = async (tokenUpdate?: string, liquityUpdate?: string, wethUpdate?: string) => {
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

      if (tokenUpdate) {
        setAccountInfo((prevState) => ({
          ...prevState,
          myTokenBalance: tokenUpdate,
        }));
      }
      if (liquityUpdate) {
        setAccountInfo((prevState) => ({
          ...prevState,
          liquidityTokenBalance: liquityUpdate,
        }));
      }
      if (wethUpdate) {
        setAccountInfo((prevState) => ({
          ...prevState,
          WETHBalance: wethUpdate,
        }));
      }
    }
  };
  // state is initialized with undefined values
  const [accountInfo, setAccountInfo] = useState<AccountInfo>({
    currentAccount: undefined,
    balance: undefined,
    chainId: undefined,
    chainName: undefined,
    myTokenBalance:undefined,
    WETHBalance: undefined,
    liquidityTokenBalance: undefined,
    connectMetaMask: connectMetaMask,
    disconnectMetaMask: disconnectMetaMask,
    getCurrentAccount: getCurrentAccount,
  });


  



  return { ...accountInfo, connectMetaMask, disconnectMetaMask };
};
