import { getDoc, doc } from "@firebase/firestore";
import { User } from "common/types";
import { db } from "firebase-config";

export const getUserData = async (userId: string) => {
  const userDoc = doc(db, "users", userId);
  const data = await getDoc(userDoc);
  const user = data.data() as User;
  return user;
};
