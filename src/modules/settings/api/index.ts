import { doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "firebase-config";
import { OpeningHours, Settings } from "../types";
import { parseGetDoc } from "common/utils/firebaseHelpers";

export const getSettings = async (companyId: string) => {
  const docRef = doc(db, "settings", companyId);
  const settingsDoc = await getDoc(docRef);

  return parseGetDoc<Settings>(settingsDoc);
};

export const saveOpeningHoursSettings = async (
  formValues: OpeningHours,
  userId: string
) => {
  await setDoc(
    doc(db, "settings", userId),
    { openingHours: formValues },
    { merge: true }
  );
};
