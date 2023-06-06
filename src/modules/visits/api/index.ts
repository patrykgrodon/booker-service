import {
  addDoc,
  collection,
  doc,
  updateDoc,
  Timestamp,
} from "@firebase/firestore";

import { db } from "firebase-config";
import { VisitFormValues } from "../types";

const transformFormValues = (formValues: VisitFormValues) => {
  const { customer, date, employee, service } = formValues;
  return {
    date: Timestamp.fromDate(date),
    customer: doc(db, "customers", customer),
    employee: doc(db, "employees", employee),
    service: doc(db, "services", service),
  };
};

export const addVisit = async (formValues: VisitFormValues) => {
  await addDoc(collection(db, "visits"), transformFormValues(formValues));
};

export const editVisit = async (id: string, formValues: VisitFormValues) => {
  await updateDoc(doc(db, "visits", id), transformFormValues(formValues));
};
