import { useQuery } from "@tanstack/react-query";
import { getCompanyEmployees } from "../api";

const useCompanyEmployees = (companyId: string, initFetch = true) => {
  const { data, ...queryResult } = useQuery(
    ["employees", companyId],
    () => getCompanyEmployees(companyId),
    { enabled: initFetch }
  );
  return { ...queryResult, employees: data };
};

export default useCompanyEmployees;
