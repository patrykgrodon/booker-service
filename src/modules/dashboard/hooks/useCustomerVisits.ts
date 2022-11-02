import { db } from "firebase-config";
import { useAuth } from "modules/auth/contexts/authContext";
import { useQuery } from "react-query";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { parseGetDocs } from "utils/parseGetDocs";
import { Visit, VisitWithTimeStamp } from "common/providers/VisitsProvider";

const useCustomerVisits = () => {
  const { user } = useAuth();

  const getCustomerVisits = async (userId: string, comparator: ">" | "<") => {
    const visitsCollectionRef = collection(db, "visits");
    const q = query(
      visitsCollectionRef,
      where("customer.id", "==", userId),
      where("date", comparator, new Date())
    );
    const data = await getDocs(q);
    const visitsWithTimeStamp = parseGetDocs<VisitWithTimeStamp[]>(data);
    const visits: Visit[] = visitsWithTimeStamp.map((visit) => {
      return { ...visit, date: visit.date.toDate() };
    });
    return visits;
  };

  const { data: upcomingCustomerVisits, isLoading: isLoadingUpcVisits } =
    useQuery([`upcoming-customer-visits`, user?.id], () => {
      if (!user) return undefined;
      return getCustomerVisits(user.id, ">");
    });

  const { data: finishedCustomerVisits, isLoading: isLoadingFinishedVisits } =
    useQuery([`finished-customer-visits`, user?.id], () => {
      if (!user) return undefined;
      return getCustomerVisits(user.id, "<");
    });
  return {
    isLoadingUpcVisits,
    isLoadingFinishedVisits,
    upcomingCustomerVisits,
    finishedCustomerVisits,
  };
};

export default useCustomerVisits;
