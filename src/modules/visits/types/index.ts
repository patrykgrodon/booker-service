import { DocumentReference, Timestamp } from "firebase/firestore";
import { Customer } from "modules/customers/types";
import { Employee } from "modules/employees/types";
import { Service } from "modules/services/types";

export type VisitFormValues = {
  customer: string;
  employee: string;
  service: string;
  date: Date;
};

export type Visit = {
  id: string;
  customer: Customer;
  employee: Employee;
  service: Service;
  date: Date;
  companyId: string;
};

export type VisitDoc = {
  id: string;
  companyId: string;
  customer: DocumentReference;
  employee: DocumentReference;
  service: DocumentReference;
  date: Timestamp;
};
