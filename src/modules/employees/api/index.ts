import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { parseGetDocs } from "common/utils/firebaseHelpers";
import { db } from "firebase-config";
import { VisitDoc } from "modules/visits/types";
import { Employee, EmployeeFormValues } from "../types";
import { addMinutes, sub } from "date-fns";

const employeesCollectionRef = collection(db, "employees");

export const getCompanyEmployees = async (companyId: string) => {
  const q = query(employeesCollectionRef, where("companyId", "==", companyId));
  const data = await getDocs(q);

  return parseGetDocs<Employee[]>(data);
};

export const addEmployee = async (
  userId: string,
  formValues: EmployeeFormValues
) => {
  const newEmployee: Omit<Employee, "id"> = {
    companyId: userId,
    ...formValues,
  };
  await addDoc(employeesCollectionRef, newEmployee);
};

export const editEmployee = async (
  employeeId: string,
  formValues: EmployeeFormValues
) => {
  const employeeDoc = doc(db, "employees", employeeId);
  await updateDoc(employeeDoc, formValues);
};
export const deleteEmployee = async (employeeId: string) => {
  const employeeDoc = doc(db, "employees", employeeId);
  await deleteDoc(employeeDoc);
};

export const checkIfEmployeeIsAvailable = async (
  employeeId: string,
  dateRange: [Date, Date]
) => {
  const [startAt, endAt] = dateRange;

  const q = query(
    collection(db, "visits"),
    where("startAt", ">", sub(startAt, { minutes: 1 })),
    where("startAt", "<", addMinutes(endAt, 1)),
    where("employee", "==", doc(db, "employees", employeeId))
  );

  const data = await getDocs(q);

  const visitsDoc = parseGetDocs<VisitDoc[]>(data);
  return visitsDoc.length === 0;
};
