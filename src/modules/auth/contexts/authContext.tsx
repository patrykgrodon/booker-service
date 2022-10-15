import { createContext, useContext } from "react";

interface AuthContextState {}

const AuthContext = createContext<AuthContextState | null>(null);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
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
