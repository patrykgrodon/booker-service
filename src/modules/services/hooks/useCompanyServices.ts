import { useQuery } from "@tanstack/react-query";
import { getCompanyServices } from "../api";

const useCompanyServices = (companyId: string, initFetch = true) => {
  const { data, ...queryResult } = useQuery(
    ["services", companyId],
    () => getCompanyServices(companyId),
    { enabled: initFetch }
  );
  return { ...queryResult, services: data };
};

export default useCompanyServices;
