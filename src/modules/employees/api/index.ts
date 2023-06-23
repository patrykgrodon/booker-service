import { collection, getDocs, query, where } from "firebase/firestore";

import { parseGetDocs } from "common/utils/firebaseHelpers";
import { db } from "firebase-config";
import { Employee } from "../types";

const employeesCollectionRef = collection(db, "employees");

export const getCompanyEmployees = async (companyId: string) => {
  const q = query(employeesCollectionRef, where("companyId", "==", companyId));
  const data = await getDocs(q);

  return parseGetDocs<Employee[]>(data);
};
