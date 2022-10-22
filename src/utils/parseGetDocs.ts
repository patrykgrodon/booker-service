import { DocumentData, QuerySnapshot } from "@firebase/firestore";

export const parseGetDocs = <T>(data: QuerySnapshot<DocumentData>): T => {
  return data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as T;
};
