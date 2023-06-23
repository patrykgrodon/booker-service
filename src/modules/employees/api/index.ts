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
import { Employee, EmployeeFormValues } from "../types";

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
