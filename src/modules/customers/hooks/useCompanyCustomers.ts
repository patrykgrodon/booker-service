import { useQuery } from "@tanstack/react-query";
import { getCompanyCustomers } from "../api";

const useCompanyCustomers = (companyId: string, initFetch = true) => {
  const { data, ...queryResult } = useQuery(
    ["customers", companyId],
    () => getCompanyCustomers(companyId),
    { enabled: initFetch }
  );
  return { ...queryResult, customers: data };
};

export default useCompanyCustomers;
