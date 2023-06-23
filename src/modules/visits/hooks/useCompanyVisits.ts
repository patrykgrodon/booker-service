import { useQuery } from "@tanstack/react-query";
import { getCompanyVisits } from "../api";
import { queryKeys } from "common/utils/queryKeys";

const useCompanyVisits = (
  companyId: string | undefined,
  finished = false,
  initFetch = true
) => {
  const { data, ...queryResult } = useQuery(
    queryKeys.companyVisits(companyId || "", finished),
    () => getCompanyVisits(companyId || "", finished),
    { enabled: initFetch && !!companyId }
  );
  return { ...queryResult, visits: data };
};

export default useCompanyVisits;
