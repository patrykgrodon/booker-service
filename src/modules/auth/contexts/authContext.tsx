import { createContext, useContext, useState } from "react";
import { sleep } from "utils/sleep";
import { LoginFormValues } from "../types";

interface User {
  firstName: string;
  lastName: string;
}
interface AuthContextState {
  user: User | null;
  login: (loginFormValues: LoginFormValues) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextState | null>(null);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const accounts = [
  {
    email: "patryk@gmail.com",
    password: "123",
  },
  {
    email: "wiktoria@gmail.com",
    password: "123",
  },
  {
    email: "william@gmail.com",
    password: "123",
  },
];

const accountInfo: { [key: string]: User } = {
  "patryk@gmail.com": { firstName: "Patryk", lastName: "Grodoń" },
  "wiktoria@gmail.com": { firstName: "Wiktoria", lastName: "Grodoń" },
  "william@gmail.com": { firstName: "William", lastName: "Grodoń" },
};

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (loginFormValues: LoginFormValues) => {
    const { email, password } = loginFormValues;

    await sleep(800);
    const account = accounts.find(
      (account) => account.email === email.toLowerCase()
    );

    if (account?.password === password)
      return setUser(accountInfo[account.email]);

    throw new Error("wrong user data");
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ login, user, logout }}>
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
