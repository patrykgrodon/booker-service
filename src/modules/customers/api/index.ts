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
import { Customer, CustomerFormValues } from "modules/customers/types";

const customersCollectionRef = collection(db, "customers");

export const getCompanyCustomers = async (companyId: string) => {
  const q = query(customersCollectionRef, where("companyId", "==", companyId));
  const data = await getDocs(q);

  return parseGetDocs<Customer[]>(data);
};

export const addCustomer = async (
  companyId: string,
  formValues: CustomerFormValues
) => {
  const newCustomer: Omit<Customer, "id"> = {
    companyId,
    ...formValues,
  };
  return await addDoc(customersCollectionRef, newCustomer);
};

export const editCustomer = async (
  customerId: string,
  formValues: CustomerFormValues
) => {
  const customerDoc = doc(db, "customers", customerId);
  await updateDoc(customerDoc, formValues);
};
export const deleteCustomer = async (customerId: string) => {
  const customerDoc = doc(db, "customers", customerId);
  await deleteDoc(customerDoc);
};
