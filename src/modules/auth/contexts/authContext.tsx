import { createContext, useContext, useEffect, useState } from "react";
import { sleep } from "utils/sleep";
import { deleteSSItem, getSSItem, saveSSItem } from "utils/webStorage";
import { LoginFormValues } from "../types";

type UserType = "customer" | "service-seller";
export interface User {
  firstName: string;
  lastName: string;
  userType: UserType;
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

const users = [
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

const userInfo: { [key: string]: User } = {
  "patryk@gmail.com": {
    firstName: "Patryk",
    lastName: "Grodoń",
    userType: "service-seller",
  },
  "wiktoria@gmail.com": {
    firstName: "Wiktoria",
    lastName: "Grodoń",
    userType: "customer",
  },
  "william@gmail.com": {
    firstName: "William",
    lastName: "Grodoń",
    userType: "customer",
  },
};

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const ssUserInfoName = "user-info";
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loggedUserInfo = getSSItem(ssUserInfoName);
    if (!loggedUserInfo) return;
    setUser(loggedUserInfo);
  }, []);

  const login = async (loginFormValues: LoginFormValues) => {
    const { email, password } = loginFormValues;

    await sleep(800);
    const account = users.find(
      (account) => account.email === email.toLowerCase()
    );

    if (account?.password === password) {
      const accInfo = userInfo[account.email];
      saveSSItem(ssUserInfoName, accInfo);
      return setUser(accInfo);
    }

    throw new Error("wrong user data");
  };

  const logout = () => {
    deleteSSItem(ssUserInfoName);
    setUser(null);
  };

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
