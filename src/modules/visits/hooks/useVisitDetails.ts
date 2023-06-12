import { useQuery } from "@tanstack/react-query";
import { getVisit } from "../api";

const useVisitDetails = (visitId: string) => {
  const { data: visit, ...restQueryData } = useQuery(["visit", visitId], () =>
    getVisit(visitId)
  );
  return { visit, ...restQueryData };
};

export default useVisitDetails;
