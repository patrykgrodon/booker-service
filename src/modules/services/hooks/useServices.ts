import { useAuth } from "modules/auth/contexts";
import { AddService, EditService, DeleteService, Service } from "../types";

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "@firebase/firestore";

import { db } from "firebase-config";
const servicesCollectionRef = collection(db, "services");

const useServices = () => {
  const { user } = useAuth();
  const addService: AddService = async (formValues) => {
    if (!user) return;
    const newService: Omit<Service, "id"> = {
      companyId: user.id,
      ...formValues,
    };
    await addDoc(servicesCollectionRef, newService);
  };

  const editService: EditService = async (id, formValues) => {
    const serviceDoc = doc(db, "services", id);
    await updateDoc(serviceDoc, formValues);
  };
  const deleteService: DeleteService = async (id) => {
    const serviceDoc = doc(db, "services", id);
    await deleteDoc(serviceDoc);
  };

  return { addService, editService, deleteService };
};

export default useServices;
