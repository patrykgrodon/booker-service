import { useQuery } from "@tanstack/react-query";
import { getCompanyEmployees } from "../api";

const useCompanyEmployees = (
  companyId: string | undefined,
  initFetch = true
) => {
  const { data, ...queryResult } = useQuery(
    ["employees", companyId],
    () => getCompanyEmployees(companyId || ""),
    { enabled: initFetch && !!companyId }
  );
  return { ...queryResult, employees: data };
};

export default useCompanyEmployees;
