import { User } from "common/types";
import { createContext, useContext, useEffect, useState } from "react";
import { CreateUser, Login } from "../types";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "@firebase/auth";
import { auth, db } from "firebase-config";
import { doc, setDoc } from "@firebase/firestore";
import { getUserData } from "../api";
import { Spinner } from "common/components";
import { deleteLSItem } from "utils/webStorage";
import { useAuthState } from "react-firebase-hooks/auth";

interface AuthContextState {
  user: User | null;
  createUser: CreateUser;
  login: Login;
  logout: () => void;
}

const AuthContext = createContext<AuthContextState | null>(null);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, isCheckingAuth] = useAuthState(auth);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);
  useEffect(() => {
    if (!userInfo) return;
    const get = async () => {
      setIsLoadingUserData(true);
      const userData = await getUserData(userInfo.uid);
      setUser(userData);
      setIsLoadingUserData(false);
    };
    get();
  }, [userInfo]);

  const createUser: CreateUser = async (type, formValues) => {
    const { password, ...restValues } = formValues;
    const {
      user: { uid },
    } = await createUserWithEmailAndPassword(auth, formValues.email, password);
    const usersDocRef = doc(db, "users", uid);
    await setDoc(usersDocRef, { ...restValues, type });
  };

  const login: Login = async (loginFormValues) => {
    const { email, password } = loginFormValues;
    const {
      user: { uid },
    } = await signInWithEmailAndPassword(auth, email, password);
    const userData = await getUserData(uid);
    setUser(userData);
  };

  const logout = async () => {
    await signOut(auth);
    deleteLSItem("auth");
    setUser(null);
  };

  if (isCheckingAuth || isLoadingUserData)
    return <Spinner fullPage size="large" />;

  return (
    <AuthContext.Provider value={{ login, user, logout, createUser }}>
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
