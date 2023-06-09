import { useQuery } from "@tanstack/react-query";
import { getCompanyVisits } from "../api";

const useCompanyVisits = (companyId: string | undefined, initFetch = true) => {
  const { data, ...queryResult } = useQuery(
    ["visits", companyId],
    () => getCompanyVisits(companyId || ""),
    { enabled: initFetch && !!companyId }
  );
  return { ...queryResult, visits: data };
};

export default useCompanyVisits;
