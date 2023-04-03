import { ethers } from "ethers";
import DappTokenABI from "./dappToken.json";
import byteCode from "./byteCode.json"
import { useAccountInfoContext } from "./accountInfoContext";


declare let window: any;
export let signer: ethers.Signer;
export let provider: ethers.providers.Web3Provider;
export let dappToken: ethers.Contract;


export async function setProviderandSigner() {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
}

export async function deployDappToken(name: string, symbol: string, initialSupply: string) : Promise<string> {
    const DappTokenFactory = new ethers.ContractFactory(DappTokenABI, byteCode.bytecode, signer);

    const uniswapV2RouterAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"; // Replace with the Uniswap V2 Router address
    const uniswapV2FactoryAddress = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"; // Replace with the Uniswap V2 Factory address

    
    const dappToken = await DappTokenFactory.deploy(
        name,
        symbol,
        initialSupply,
        uniswapV2RouterAddress,
        uniswapV2FactoryAddress
    );

    console.log("Deploying DappToken...");
    await dappToken.deployed();
    console.log("DappToken deployed to:", dappToken.address);
    
    let tokens = await dappToken.balanceOf(await signer.getAddress());
    
    return ethers.utils.formatEther(tokens);
}

// Function to wait for WrappedETH event
export function waitForWrappedETH(): Promise<{ user: string; amount: ethers.BigNumber }> {
    return new Promise((resolve) => {
      dappToken.on("WrappedETH", (user, amount) => {
        // Remove the event listener once the event is received
        dappToken.removeAllListeners("WrappedETH");
        resolve({ user, amount });
      });
    });
}

// Wrap ETH into WETH
export async function wrapETH(amountInput: string) {
    const wrapAmount = ethers.utils.parseEther(amountInput);
  
    const tx = await dappToken.wrapETH(wrapAmount, { value: wrapAmount });
    await tx.wait();
    const { amount } = await waitForWrappedETH();

    return ethers.utils.formatEther(amount);
}

// Add liquidity to the custom token-WETH pool
export async function addLiquidity(tokenAmount: string, wethAmount: string) {
  
    const tokenAmt = ethers.utils.parseUnits(tokenAmount, 18);
    const wethAmt = ethers.utils.parseEther(wethAmount);
  
    const tx = await dappToken.addLiquidity(tokenAmt, wethAmt, { value: wethAmt });
    await tx.wait();

  }


// Remove liquidity from the custom token-WETH pool
export async function removeLiquidity() {
    const tx = await dappToken.removeLiquidity();
    await tx.wait();
 }
  
  // Swap tokens in the custom token-WETH pool
  export async function swapTokens(inputTokenAmount: string, swapType: boolean) {
    const dappTokenAddress = ""; // Replace with your DappToken contract address
    const dappToken = new ethers.Contract(dappTokenAddress, DappTokenABI, signer);
  
    const inputAmount = ethers.utils.parseUnits(inputTokenAmount, 18);
  
    const tx = await dappToken.swapTokens(inputAmount, swapType);
    await tx.wait();
  }
  