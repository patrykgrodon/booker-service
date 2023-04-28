import { useQuery } from "@tanstack/react-query";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "firebase-config";
import { parseGetDocs } from "common/utils/firebaseHelpers";
import { Service } from "modules/services/types";

const useCompanyServices = (companyId: string, initFetch = true) => {
  const servicesCollectionRef = collection(db, "services");

  const { data, ...queryResult } = useQuery(
    ["services", companyId],
    async () => {
      const q = query(
        servicesCollectionRef,
        where("companyId", "==", companyId)
      );
      const data = await getDocs(q);

      return parseGetDocs<Service[]>(data);
    },
    { enabled: initFetch }
  );
  return { ...queryResult, services: data };
};

export default useCompanyServices;
