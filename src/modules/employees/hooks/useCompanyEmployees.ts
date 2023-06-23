import { useQuery } from "@tanstack/react-query";
import { getCompanyEmployees } from "../api";
import { queryKeys } from "common/utils/queryKeys";

const useCompanyEmployees = (
  companyId: string | undefined,
  initFetch = true
) => {
  const { data, ...queryResult } = useQuery(
    queryKeys.companyEmployees(companyId || ""),
    () => getCompanyEmployees(companyId || ""),
    { enabled: initFetch && !!companyId }
  );
  return { ...queryResult, employees: data };
};

export default useCompanyEmployees;
