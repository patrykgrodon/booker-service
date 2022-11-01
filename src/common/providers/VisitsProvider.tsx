import { createContext, useContext } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
  addDoc,
} from "@firebase/firestore";
import { db } from "firebase-config";
import { useAuth } from "modules/auth/contexts/authContext";
import { Service } from "modules/services/types";
import { useQuery } from "react-query";
import { convertToFirebaseTimestamp } from "utils/dateTimeUtils";
import { parseGetDocs } from "utils/parseGetDocs";
import { CustomerUserInfo } from "common/types";

interface VisitsContextState {
  visits: Visit[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  addVisit: (visit: Omit<Visit, "id">) => Promise<void>;
  refetchVisits: () => Promise<void>;
}

const VisitsContext = createContext<VisitsContextState | null>(null);

type Props = {
  children: React.ReactNode;
};

export interface Visit {
  customer: CustomerUserInfo & { id: string };
  date: Date;
  service: Service;
  id: string;
}

export type VisitWithTimeStamp = Omit<Visit, "date"> & {
  date: Timestamp;
};

const VisitsContextProvider = ({ children }: Props) => {
  const { user } = useAuth();

  const visitsCollectionRef = collection(db, "visits");
  const getVisits = async (userId: string) => {
    const q = query(
      visitsCollectionRef,
      where(
        user?.type === "customer" ? "customerId" : "service.userId",
        "==",
        userId
      )
    );
    const data = await getDocs(q);
    const visitsWithTimeStamp = parseGetDocs<VisitWithTimeStamp[]>(data);
    const visits: Visit[] = visitsWithTimeStamp.map((visit) => {
      return { ...visit, date: visit.date.toDate() };
    });
    return visits;
  };

  const {
    data: visits,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery([`visits-${user?.id || ""}`], () => {
    if (!user) return undefined;
    return getVisits(user.id);
  });

  const addVisit = async (visit: Omit<Visit, "id">) => {
    const visitWithT: Omit<VisitWithTimeStamp, "id"> = {
      ...visit,
      date: convertToFirebaseTimestamp(visit.date),
    };
    await addDoc(visitsCollectionRef, visitWithT);
    refetch();
  };

  const refetchVisits = async () => {
    await refetch();
  };

  return (
    <VisitsContext.Provider
      value={{
        visits,
        isLoading,
        isFetching,
        refetchVisits,
        isError,
        addVisit,
      }}>
      {children}
    </VisitsContext.Provider>
  );
};

const useVisits = () => {
  const context = useContext(VisitsContext);
  if (!context) {
    throw Error("Visits context must be used within provider");
  }
  return context;
};

export { useVisits };

export default VisitsContextProvider;
