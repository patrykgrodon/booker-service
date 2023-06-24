import { useQuery } from "@tanstack/react-query";
import { getCompanyVisits } from "../api";
import { queryKeys } from "common/utils/queryKeys";
import { VisitsFilters } from "./useVisitsFilters";

const useCompanyVisits = (
  companyId: string | undefined,
  filters: VisitsFilters,
  finished = false,
  initFetch = true
) => {
  const { data, ...queryResult } = useQuery(
    queryKeys.companyVisits(companyId || "", filters, finished),
    () => getCompanyVisits(companyId || "", filters, finished),
    { enabled: initFetch && !!companyId }
  );
  return { ...queryResult, visits: data };
};

export default useCompanyVisits;
