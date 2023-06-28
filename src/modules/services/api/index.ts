import {
  collection,
  query,
  getDocs,
  where,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "firebase-config";
import { parseGetDocs } from "common/utils/firebaseHelpers";
import { Service, ServiceFormValues } from "modules/services/types";

const servicesCollectionRef = collection(db, "services");

export const getCompanyServices = async (companyId: string) => {
  const q = query(servicesCollectionRef, where("companyId", "==", companyId));
  const data = await getDocs(q);

  return parseGetDocs<Service[]>(data);
};

export const addService = async (
  companyId: string,
  formValues: ServiceFormValues
) => {
  const newService: Omit<Service, "id"> = {
    companyId,
    ...formValues,
  };
  return await addDoc(servicesCollectionRef, newService);
};

export const editService = async (
  serviceId: string,
  formValues: ServiceFormValues
) => {
  const serviceDoc = doc(db, "services", serviceId);
  await updateDoc(serviceDoc, formValues);
};

export const deleteService = async (serviceId: string) => {
  const serviceDoc = doc(db, "services", serviceId);
  await deleteDoc(serviceDoc);
};
