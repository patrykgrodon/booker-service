import { useQuery } from "@tanstack/react-query";
import { getVisit } from "../api";
import { queryKeys } from "common/utils/queryKeys";

const useVisitDetails = (visitId: string) => {
  const { data: visit, ...restQueryData } = useQuery(
    queryKeys.visit(visitId),
    () => getVisit(visitId)
  );
  return { visit, ...restQueryData };
};

export default useVisitDetails;
