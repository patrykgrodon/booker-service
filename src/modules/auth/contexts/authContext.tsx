import { useAccounts } from "common/providers/AccountsProvider";
import { Account } from "common/types";
import { createContext, useContext, useEffect, useState } from "react";
import { sleep } from "utils/sleep";
import { deleteSSItem, getSSItem, saveSSItem } from "utils/webStorage";
import { LoginFormValues } from "../types";

interface AuthContextState {
  account: Account | null;
  login: (loginFormValues: LoginFormValues) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextState | null>(null);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const ssAccInfoName = "acc-info";
  const { accounts } = useAccounts();
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    const loggedAccInfo = getSSItem(ssAccInfoName);
    if (!loggedAccInfo) return;
    setAccount(loggedAccInfo);
  }, []);

  const login = async (loginFormValues: LoginFormValues) => {
    const { email, password } = loginFormValues;

    await sleep(800);
    const account = accounts.find(
      (account) => account.email === email.toLowerCase()
    );

    if (account?.password === password) {
      saveSSItem(ssAccInfoName, account);
      return setAccount(account);
    }

    throw new Error("wrong user data");
  };

  const logout = () => {
    deleteSSItem(ssAccInfoName);
    setAccount(null);
  };

  return (
    <AuthContext.Provider value={{ login, account, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext must be used within provider");
  }
  return context;
};

export { useAuth };
export default AuthContextProvider;
