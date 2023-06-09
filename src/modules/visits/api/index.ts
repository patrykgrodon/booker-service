import {
  addDoc,
  collection,
  doc,
  updateDoc,
  Timestamp,
  query,
  where,
  getDocs,
  getDoc,
} from "@firebase/firestore";

import { db } from "firebase-config";
import { Visit, VisitDoc, VisitFormValues } from "../types";
import { parseGetDoc, parseGetDocs } from "common/utils/firebaseHelpers";

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

export const getCompanyVisits = async (companyId: string): Promise<Visit[]> => {
  const q = query(visitsCollectionRef, where("companyId", "==", companyId));
  const data = await getDocs(q);

  const parsedFlat = parseGetDocs<VisitDoc[]>(data);

  const visits = await Promise.all(
    parsedFlat.map(
      async ({
        companyId,
        customer: customerRef,
        date,
        employee: employeeRef,
        id,
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
