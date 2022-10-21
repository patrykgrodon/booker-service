import { User } from "common/types";
import { createContext, useContext, useState } from "react";
import { CreateUser, Login } from "../types";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "@firebase/auth";
import { auth, db } from "firebase-config";
import { addDoc, collection } from "@firebase/firestore";
import { getUserData } from "../api";

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
  const createUser: CreateUser = async (type, formValues) => {
    const { password, ...restValues } = formValues;
    await createUserWithEmailAndPassword(auth, formValues.email, password);
    const usersCollectionRef = collection(db, "users");
    const { id } = await addDoc(usersCollectionRef, { ...restValues, type });
    const userData = await getUserData(id);
    setUser(userData);
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
    setUser(null);
  };

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
