import { db } from "firebase-config";
import { doc, getDoc, setDoc, updateDoc } from "@firebase/firestore";
import { UserSettings } from "common/types";

export const getUserSettings = async (userId: string) => {
  const docRef = doc(db, "settings", userId);
  const data = await getDoc(docRef);
  const dbUserData = data.data();
  if (!dbUserData) return undefined;
  const userSettings = {
    ...dbUserData,
    id: data.id,
  } as UserSettings;
  return userSettings;
};

export const createUserSettings = async (
  userId: string,
  settings: Partial<Omit<UserSettings, "id">>
) => {
  const settingsDocRef = doc(db, "settings", userId);
  await setDoc(settingsDocRef, { ...settings });
};

export const editUserSettings = async (
  userId: string,
  settings: Partial<Omit<UserSettings, "id">>
) => {
  const settingsDocRef = doc(db, "settings", userId);
  await updateDoc(settingsDocRef, { ...settings });
};
