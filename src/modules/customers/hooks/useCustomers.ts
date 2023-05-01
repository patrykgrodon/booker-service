import { useAuth } from "modules/auth/contexts";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "@firebase/firestore";

import { AddCustomer, EditCustomer, DeleteCustomer, Customer } from "../types";
import { db } from "firebase-config";

const useCustomers = () => {
  const { user } = useAuth();
  const customersCollectionRef = collection(db, "customers");

  const addCustomer: AddCustomer = async (formValues) => {
    if (!user) return;
    const newCustomer: Omit<Customer, "id"> = {
      companyId: user.id,
      ...formValues,
    };
    await addDoc(customersCollectionRef, newCustomer);
  };

  const editCustomer: EditCustomer = async (id, formValues) => {
    const customerDoc = doc(db, "customers", id);
    await updateDoc(customerDoc, formValues);
  };
  const deleteCustomer: DeleteCustomer = async (id) => {
    const customerDoc = doc(db, "customers", id);
    await deleteDoc(customerDoc);
  };

  return { addCustomer, editCustomer, deleteCustomer };
};

export default useCustomers;
