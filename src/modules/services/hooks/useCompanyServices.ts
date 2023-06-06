import { useQuery } from "@tanstack/react-query";
import { getCompanyServices } from "../api";

const useCompanyServices = (
  companyId: string | undefined,
  initFetch = true
) => {
  const { data, ...queryResult } = useQuery(
    ["services", companyId],
    () => getCompanyServices(companyId || ""),
    { enabled: initFetch && !!companyId }
  );
  return { ...queryResult, services: data };
};

export default useCompanyServices;
