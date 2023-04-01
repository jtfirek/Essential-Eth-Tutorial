import { createContext, useContext } from 'react';
import { useAccountInfo, AccountInfo } from './accountsLogic';



// Create a global state for the account info
const AccountInfoContext = createContext<AccountInfo>({
  currentAccount: undefined,
  balance: undefined,
  chainId: undefined,
  chainName: undefined,
  connectMetaMask: undefined,
  disconnectMetaMask: undefined,
});

// Custom hook to access the account info in components
export const useAccountInfoContext = () => {
  return useContext(AccountInfoContext);
};

// AccountInfoProvider component wraps the global state so it can be accessed by components
export const AccountInfoProvider: React.FC = ({ children }) => {
  const accountInfo = useAccountInfo();

  return (
    <AccountInfoContext.Provider value={accountInfo}>
      {children}
    </AccountInfoContext.Provider>
  );
};
