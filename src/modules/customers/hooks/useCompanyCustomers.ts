import { useQuery } from "@tanstack/react-query";
import { getCompanyCustomers } from "../api";
import { queryKeys } from "common/utils/queryKeys";

const useCompanyCustomers = (
  companyId: string | undefined,
  initFetch = true
) => {
  const { data, ...queryResult } = useQuery(
    queryKeys.companyCustomers(companyId || ""),
    () => getCompanyCustomers(companyId || ""),
    { enabled: initFetch && !!companyId }
  );
  return { ...queryResult, customers: data };
};

export default useCompanyCustomers;
