import { useAuth } from "modules/auth/contexts";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "@firebase/firestore";

import { AddEmployee, EditEmployee, DeleteEmployee, Employee } from "../types";
import { db } from "firebase-config";

const useEmployees = () => {
  const { user } = useAuth();
  const employeesCollectionRef = collection(db, "employees");

  const addEmployee: AddEmployee = async (formValues) => {
    if (!user) return;
    const newEmployee: Omit<Employee, "id"> = {
      companyId: user.id,
      ...formValues,
    };
    await addDoc(employeesCollectionRef, newEmployee);
  };

  const editEmployee: EditEmployee = async (id, formValues) => {
    const employeeDoc = doc(db, "employees", id);
    await updateDoc(employeeDoc, formValues);
  };
  const deleteEmployee: DeleteEmployee = async (id) => {
    const employeeDoc = doc(db, "employees", id);
    await deleteDoc(employeeDoc);
  };

  return { addEmployee, editEmployee, deleteEmployee };
};

export default useEmployees;
