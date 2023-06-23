import { useQuery } from "@tanstack/react-query";
import { getCompanyServices } from "../api";
import { queryKeys } from "common/utils/queryKeys";

const useCompanyServices = (
  companyId: string | undefined,
  initFetch = true
) => {
  const { data, ...queryResult } = useQuery(
    queryKeys.companyServices(companyId || ""),
    () => getCompanyServices(companyId || ""),
    { enabled: initFetch && !!companyId }
  );
  return { ...queryResult, services: data };
};

export default useCompanyServices;
