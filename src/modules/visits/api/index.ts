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

const visitsCollectionRef = collection(db, "visits");

const transformFormValues = (formValues: VisitFormValues) => {
  const { customer, date, employee, service } = formValues;
  return {
    date: Timestamp.fromDate(date),
    customer: doc(db, "customers", customer),
    employee: doc(db, "employees", employee),
    service: doc(db, "services", service),
  };
};

export const addVisit = async (
  companyId: string,
  formValues: VisitFormValues
) => {
  await addDoc(collection(db, "visits"), {
    companyId,
    ...transformFormValues(formValues),
  });
};

export const editVisit = async (id: string, formValues: VisitFormValues) => {
  await updateDoc(doc(db, "visits", id), transformFormValues(formValues));
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
        date,
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
          customer: parseGetDoc(customerDoc),
          service: parseGetDoc(serviceDoc),
          employee: parseGetDoc(employeeDoc),
          date: new Date(date.seconds * 1000),
          id,
          companyId,
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
    where("date", finished ? "<" : ">", new Date()),
    orderBy("date", finished ? "desc" : "asc")
  );
  const data = await getDocs(q);

  const visitsDoc = parseGetDocs<VisitDoc[]>(data);

  return await convertVisitsDocRef(visitsDoc);
};
