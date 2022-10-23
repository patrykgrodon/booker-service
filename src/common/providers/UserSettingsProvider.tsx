import { db } from "firebase-config";
import { useAuth } from "modules/auth/contexts/authContext";
import { createContext, useContext } from "react";
import { useQuery } from "react-query";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { UserSettings } from "common/types";
import { Spinner } from "common/components";

interface UserSettingsContextState {
  editSettings: (settings: Partial<Omit<UserSettings, "id">>) => Promise<void>;
  userSettings: UserSettings | undefined;
  refetchUserSettings: () => Promise<void>;
}

const UserSettingsContext = createContext<UserSettingsContextState | null>(
  null
);

interface UserSettingsContextProviderProps {
  children: React.ReactNode;
}

const UserSettingsContextProvider = ({
  children,
}: UserSettingsContextProviderProps) => {
  const { user } = useAuth();

  const {
    data: userSettings,
    refetch,
    isLoading,
  } = useQuery([`user-settings-${user?.id || ""}`], async () => {
    if (!user) return undefined;
    const docRef = doc(collection(db, "settings", user.id));
    const data = await getDoc(docRef);
    const UserSettingsContext = {
      ...data.data(),
      id: data.id,
    } as UserSettings;

    return UserSettingsContext;
  });

  const editSettings = async (settings: Partial<Omit<UserSettings, "id">>) => {
    if (!user) return;
    const settingsDocRef = doc(db, "settings", user.id);
    if (!userSettings) {
      await setDoc(settingsDocRef, { ...settings });
    } else {
      await updateDoc(settingsDocRef, { ...settings });
    }
  };

  const refetchUserSettings = async () => {
    await refetch();
  };

  if (isLoading) return <Spinner fullPage size="large" />;

  return (
    <UserSettingsContext.Provider
      value={{ userSettings, editSettings, refetchUserSettings }}>
      {children}
    </UserSettingsContext.Provider>
  );
};

const useUserSettings = () => {
  const context = useContext(UserSettingsContext);
  if (!context) {
    throw new Error("UserSettingsContext must be used within provider");
  }
  return context;
};

export { useUserSettings };
export default UserSettingsContextProvider;
