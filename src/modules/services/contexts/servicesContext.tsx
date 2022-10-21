import { db } from "firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "@firebase/firestore";
import { useAuth } from "modules/auth/contexts/authContext";
import { createContext, useContext } from "react";
import { AddService, DeleteService, EditService, Service } from "../types";
import { useQuery } from "react-query";

interface ServicesContextState {
  myServices: Service[] | undefined;
  addService: AddService;
  deleteService: DeleteService;
  editService: EditService;
}

const ServicesContext = createContext<ServicesContextState | null>(null);

interface ServicesContextProviderProps {
  children: React.ReactNode;
}

const ServicesContextProvider = ({
  children,
}: ServicesContextProviderProps) => {
  const { user } = useAuth();
  const servicesCollectionRef = collection(db, "services");

  const getMyServices = async () => {
    const q = query(
      servicesCollectionRef,
      where("userId", "==", user?.id || "")
    );
    const data = await getDocs(q);
    const myServices = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Service[];
    return myServices;
  };

  const { data: myServices } = useQuery(
    [`services-${user?.id || ""}`],
    getMyServices
  );

  const addService: AddService = async (service) => {
    await addDoc(servicesCollectionRef, { ...service, userId: user?.id || "" });
  };

  const deleteService: DeleteService = async (id) => {
    const userDoc = doc(db, "services", id);
    await deleteDoc(userDoc);
  };

  const editService: EditService = async (id, service) => {
    const userDoc = doc(db, "services", id);
    await updateDoc(userDoc, service);
  };

  return (
    <ServicesContext.Provider
      value={{ myServices, addService, deleteService, editService }}>
      {children}
    </ServicesContext.Provider>
  );
};

const useServices = () => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error("ServicesContext must be used within provider");
  }
  return context;
};

export { useServices };
export default ServicesContextProvider;
