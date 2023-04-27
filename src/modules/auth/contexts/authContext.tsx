import { createContext, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "@firebase/firestore";

import { auth, db } from "firebase-config";
import { Spinner } from "common/components";
import { Login, Register } from "../types";
import { User } from "common/types";
import useFirebaseAuthState from "modules/hooks/useFirebaseAuthState";
import { getUserData } from "../api";

type AuthContextState = {
  login: Login;
  register: Register;
  logout: () => Promise<void>;
  user: User | undefined;
};

const AuthContext = createContext<AuthContextState | null>(null);

type AuthContextProviderProps = {
  children: React.ReactNode;
};

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const { userInfo, isCheckingAuth } = useFirebaseAuthState(auth);

  const queryClient = useQueryClient();

  const setUserData = (user: User | undefined) =>
    queryClient.setQueryData(["user", userInfo?.uid], () => user);

  const { data: user, isInitialLoading: isLoadingUserData } = useQuery(
    ["user", userInfo?.uid],
    () => (userInfo ? getUserData(userInfo.uid) : undefined),
    { enabled: !!userInfo }
  );

  const login: Login = async (formValues) => {
    const { email, password } = formValues;
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    setUserData(undefined);
  };

  const register: Register = async (formValues) => {
    const {
      user: { uid },
    } = await createUserWithEmailAndPassword(
      auth,
      formValues.email,
      formValues.password
    );
    const userDocRef = doc(db, "users", uid);
    const userInfo: Omit<User, "id"> = {
      city: formValues.city,
      companyName: formValues.companyName,
      email: formValues.email,
      phoneNumber: formValues.phoneNumber,
      street: formValues.phoneNumber,
      streetNumber: formValues.streetNumber,
    };
    await setDoc(userDocRef, userInfo);
  };

  if (isCheckingAuth || isLoadingUserData)
    return <Spinner fullPage size="large" />;

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
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
