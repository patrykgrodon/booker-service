import {
  DocumentData,
  QuerySnapshot,
  DocumentSnapshot,
} from "@firebase/firestore";

export const parseGetDocs = <T>(data: QuerySnapshot<DocumentData>): T => {
  return data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as T;
};

export const parseGetDoc = <T>(data: DocumentSnapshot<DocumentData>): T => {
  return {
    ...data.data(),
    id: data.id,
  } as T;
};
