import {
  DocumentData,
  DocumentReference,
  doc,
  setDoc,
} from "@firebase/firestore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { createContext, useContext } from "react";

import { Spinner } from "common/components";
import { User } from "common/types";
import { queryKeys } from "common/utils/queryKeys";
import { auth, db } from "firebase-config";
import useFirebaseAuthState from "modules/auth/hooks/useFirebaseAuthState";
import { getUserData } from "../api";
import NoUserData from "../components/NoUserData/NoUserData";
import { Login, Register, UserDocValues } from "../types";
import { addInitialData } from "common/utils/addInitialData";

type AuthContextState = {
  login: Login;
  register: Register;
  logout: () => Promise<void>;
  user: User | undefined;
  loginWithGoogle: () => Promise<void>;
  hasUserCompleteRegister: boolean;
  refetchUser: () => Promise<void>;
  saveUserDoc: (
    userDocRef: DocumentReference<DocumentData>,
    userDocValues: UserDocValues
  ) => Promise<void>;
};

const AuthContext = createContext<AuthContextState | null>(null);

type AuthContextProviderProps = {
  children: React.ReactNode;
};

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const { userInfo, isCheckingAuth } = useFirebaseAuthState(auth);

  const queryClient = useQueryClient();

  const setUserData = (user: User | undefined) =>
    queryClient.setQueryData(queryKeys.user(user?.id || ""), () => user);

  const {
    data: user,
    isInitialLoading: isLoadingUserData,
    refetch,
  } = useQuery(
    queryKeys.user(userInfo?.uid || ""),
    () => (userInfo ? getUserData(userInfo.uid) : undefined),
    { enabled: !!userInfo }
  );

  const login: Login = async (formValues) => {
    const { email, password } = formValues;
    await signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
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
    await saveUserDoc(userDocRef, {
      city: formValues.city,
      companyName: formValues.companyName,
      email: formValues.email,
      phoneNumber: formValues.phoneNumber,
      street: formValues.phoneNumber,
      streetNumber: formValues.streetNumber,
    });
  };
  const saveUserDoc = async (
    userDocRef: DocumentReference<DocumentData>,
    userDocValues: UserDocValues
  ) => {
    await setDoc(userDocRef, userDocValues);
    await addInitialData(userDocRef.id);
  };

  const refetchUser = async () => {
    await refetch();
  };

  const hasUserCompleteRegister = user ? "companyName" in user : false;

  if (isCheckingAuth || isLoadingUserData)
    return <Spinner fullPage size="large" />;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        loginWithGoogle,
        hasUserCompleteRegister,
        refetchUser,
        saveUserDoc,
      }}
    >
      {userInfo && !hasUserCompleteRegister ? (
        <NoUserData email={userInfo.email || ""} userId={userInfo.uid || ""} />
      ) : (
        children
      )}
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
