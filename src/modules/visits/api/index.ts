import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";

import { parseGetDoc, parseGetDocs } from "common/utils/firebaseHelpers";
import { db } from "firebase-config";
import { Visit, VisitDoc, VisitFormValues } from "../types";
import { addHours, addMinutes } from "date-fns";

const visitsCollectionRef = collection(db, "visits");

const transformFormValues = (
  formValues: VisitFormValues,
  serviceDuration: string
) => {
  const { customer, date, employee, service } = formValues;

  const [serviceDurationHours, serviceDurationMinutes] =
    serviceDuration.split(":");

  const endAtDate = addHours(
    addMinutes(new Date(date), +serviceDurationMinutes),
    +serviceDurationHours
  );

  const visitDocValues: Omit<VisitDoc, "id" | "companyId"> = {
    startAt: Timestamp.fromDate(date),
    endAt: Timestamp.fromDate(endAtDate),
    customer: doc(db, "customers", customer),
    employee: doc(db, "employees", employee),
    service: doc(db, "services", service),
  };

  return visitDocValues;
};

export const addVisit = async (
  companyId: string,
  formValues: VisitFormValues,
  serviceDuration: string
) => {
  await addDoc(collection(db, "visits"), {
    companyId,
    ...transformFormValues(formValues, serviceDuration),
  });
};

export const editVisit = async (
  id: string,
  formValues: VisitFormValues,
  serviceDuration: string
) => {
  await updateDoc(
    doc(db, "visits", id),
    transformFormValues(formValues, serviceDuration)
  );
};

export const deleteVisit = async (id: string) => {
  const visitDoc = doc(db, "visits", id);
  await deleteDoc(visitDoc);
};

const convertVisitsDocRef = async (visitsDoc: VisitDoc[]) => {
  const visits = await Promise.all(
    visitsDoc.map(
      async ({
        id,
        companyId,
        startAt,
        endAt,
        customer: customerRef,
        employee: employeeRef,
        service: serviceRef,
      }) => {
        const [customerDoc, serviceDoc, employeeDoc] = await Promise.all([
          getDoc(customerRef),
          getDoc(serviceRef),
          getDoc(employeeRef),
        ]);

        return {
          id,
          companyId,
          customer: parseGetDoc(customerDoc),
          service: parseGetDoc(serviceDoc),
          employee: parseGetDoc(employeeDoc),
          startAt: new Date(startAt.seconds * 1000),
          endAt: new Date(endAt.seconds * 1000),
        } as Visit;
      }
    )
  );
  return visits;
};

export const getCompanyVisits = async (
  companyId: string,
  finished: boolean
): Promise<Visit[]> => {
  const q = query(
    visitsCollectionRef,
    where("companyId", "==", companyId),
    where("endAt", finished ? "<" : ">", new Date()),
    orderBy("endAt", finished ? "desc" : "asc")
  );
  const data = await getDocs(q);

  const visitsDoc = parseGetDocs<VisitDoc[]>(data);

  return (await convertVisitsDocRef(visitsDoc)).sort((a, b) => {
    if (finished) {
      return b.startAt.getTime() - a.startAt.getTime();
    } else {
      return a.startAt.getTime() - b.startAt.getTime();
    }
  });
};
