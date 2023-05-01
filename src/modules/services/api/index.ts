import { collection, query, getDocs, where } from "firebase/firestore";

import { db } from "firebase-config";
import { parseGetDocs } from "common/utils/firebaseHelpers";
import { Service } from "modules/services/types";

const servicesCollectionRef = collection(db, "services");

export const getCompanyServices = async (companyId: string) => {
  const q = query(servicesCollectionRef, where("companyId", "==", companyId));
  const data = await getDocs(q);

  return parseGetDocs<Service[]>(data);
};
