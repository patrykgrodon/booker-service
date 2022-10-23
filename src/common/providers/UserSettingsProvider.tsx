import { useAuth } from "modules/auth/contexts/authContext";
import { createContext, useContext } from "react";
import { useQuery } from "react-query";
import { UserSettings } from "common/types";
import { Spinner } from "common/components";
import { getUserSettings } from "common/api";

interface UserSettingsContextState {
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
    return getUserSettings(user.id);
  });

  const refetchUserSettings = async () => {
    await refetch();
  };

  if (isLoading) return <Spinner fullPage size="large" />;

  return (
    <UserSettingsContext.Provider value={{ userSettings, refetchUserSettings }}>
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
