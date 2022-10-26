import { db } from "firebase-config";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { parseGetDocs } from "utils/parseGetDocs";
import { Visit, VisitWithTimeStamp } from "common/providers/VisitsProvider";

export const getServiceProviderVisits = async (
  userId: string,
  startDate: Date,
  endDate: Date
) => {
  const visitsCollectionRef = collection(db, "visits");
  const q = query(
    visitsCollectionRef,
    where("service.userId", "==", userId),
    where("date", ">=", startDate),
    where("date", "<=", endDate)
  );
  const data = await getDocs(q);
  const visitsWithTimeStamp = parseGetDocs<VisitWithTimeStamp[]>(data);
  const visits: Visit[] = visitsWithTimeStamp.map((visit) => {
    return { ...visit, date: visit.date.toDate() };
  });
  return visits;
};
