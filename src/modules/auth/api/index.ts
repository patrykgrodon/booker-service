import { doc, getDoc } from "firebase/firestore";

import { User } from "common/types";
import { db } from "firebase-config";
import { parseGetDoc } from "common/utils/firebaseHelpers";

export const getUserData = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);
  const userData = parseGetDoc<User>(userDoc);
  return userData;
};
