import {
  DocumentData,
  DocumentSnapshot,
  QuerySnapshot,
} from "@firebase/firestore";

export const parseGetDocs = <T>(data: QuerySnapshot<DocumentData>): T =>
  data.docs.map((doc) => parseGetDoc<T>(doc)) as T;

export const parseGetDoc = <T>(data: DocumentSnapshot<DocumentData>): T =>
  ({
    ...data.data(),
    id: data.id,
  } as T);
