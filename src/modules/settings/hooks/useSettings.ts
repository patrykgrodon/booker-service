import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../api";
import { useAuth } from "modules/auth/contexts";
import { Settings } from "../types";
import defaultOpeningHours from "../constants/defaultOpeningHours";
import { queryKeys } from "common/utils/queryKeys";

const useSettings = () => {
  const { user } = useAuth();
  const { data, ...queryResult } = useQuery(
    queryKeys.userSettings(user?.id || ""),
    async () => {
      const fetchedSettings = await getSettings(user?.id || "");

      const settings: Settings = {
        openingHours: fetchedSettings.openingHours || defaultOpeningHours,
      };
      return settings;
    },
    { enabled: !!user }
  );
  return { ...queryResult, settings: data };
};

export default useSettings;
