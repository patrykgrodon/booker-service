import { useQuery } from "@tanstack/react-query";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "firebase-config";
import { parseGetDocs } from "common/utils/firebaseHelpers";
import { Customer } from "modules/customers/types";

const useCompanyCustomers = (companyId: string, initFetch = true) => {
  const customersCollectionRef = collection(db, "customers");

  const { data, ...queryResult } = useQuery(
    ["customers", companyId],
    async () => {
      const q = query(
        customersCollectionRef,
        where("companyId", "==", companyId)
      );
      const data = await getDocs(q);

      return parseGetDocs<Customer[]>(data);
    },
    { enabled: initFetch }
  );
  return { ...queryResult, customers: data };
};

export default useCompanyCustomers;
