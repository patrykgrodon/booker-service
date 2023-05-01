import { collection, query, getDocs, where } from "firebase/firestore";

import { db } from "firebase-config";
import { parseGetDocs } from "common/utils/firebaseHelpers";
import { Customer } from "modules/customers/types";

const customersCollectionRef = collection(db, "customers");

export const getCompanyCustomers = async (companyId: string) => {
  const q = query(customersCollectionRef, where("companyId", "==", companyId));
  const data = await getDocs(q);

  return parseGetDocs<Customer[]>(data);
};
