import { Auth, User } from "firebase/auth";
import { useEffect, useState } from "react";

const useFirebaseAuthState = (auth: Auth) => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user === null) {
        setUserInfo(null);
      } else {
        setUserInfo(user);
      }
      setIsCheckingAuth(false);
    });
  }, [auth]);
  return { userInfo, isCheckingAuth };
};

export default useFirebaseAuthState;
