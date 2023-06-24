import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
  Query,
  DocumentData,
} from "@firebase/firestore";

import { parseGetDoc, parseGetDocs } from "common/utils/firebaseHelpers";
import { db } from "firebase-config";
import { Visit, VisitDoc, VisitFormValues } from "../types";
import { addHours, addMinutes } from "date-fns";
import { VisitsFilters } from "../hooks/useVisitsFilters";

const visitsCollectionRef = collection(db, "visits");

const transformFormValues = (
  formValues: VisitFormValues,
  serviceDuration: string
) => {
  const { customer, date, employee, service } = formValues;

  const [serviceDurationHours, serviceDurationMinutes] =
    serviceDuration.split(":");

  const endAtDate = addHours(
    addMinutes(new Date(date), +serviceDurationMinutes),
    +serviceDurationHours
  );

  const visitDocValues: Omit<VisitDoc, "id" | "companyId"> = {
    startAt: Timestamp.fromDate(date),
    endAt: Timestamp.fromDate(endAtDate),
    customer: doc(db, "customers", customer),
    employee: doc(db, "employees", employee),
    service: doc(db, "services", service),
  };

  return visitDocValues;
};

export const addVisit = async (
  companyId: string,
  formValues: VisitFormValues,
  serviceDuration: string
) => {
  await addDoc(collection(db, "visits"), {
    companyId,
    ...transformFormValues(formValues, serviceDuration),
  });
};

export const editVisit = async (
  id: string,
  formValues: VisitFormValues,
  serviceDuration: string
) => {
  await updateDoc(
    doc(db, "visits", id),
    transformFormValues(formValues, serviceDuration)
  );
};

export const deleteVisit = async (id: string) => {
  const visitDoc = doc(db, "visits", id);
  await deleteDoc(visitDoc);
};

const convertVisitDocRef = async ({
  id,
  companyId,
  startAt,
  endAt,
  customer: customerRef,
  employee: employeeRef,
  service: serviceRef,
}: VisitDoc) => {
  const [customerDoc, serviceDoc, employeeDoc] = await Promise.all([
    getDoc(customerRef),
    getDoc(serviceRef),
    getDoc(employeeRef),
  ]);

  return {
    id,
    companyId,
    customer: customerDoc.data() ? parseGetDoc(customerDoc) : null,
    service: serviceDoc.data() ? parseGetDoc(serviceDoc) : null,
    employee: employeeDoc.data() ? parseGetDoc(employeeDoc) : null,
    startAt: new Date(startAt.seconds * 1000),
    endAt: new Date(endAt.seconds * 1000),
  } as Visit;
};

const convertVisitsDocRef = async (visitsDoc: VisitDoc[]) => {
  const visits = await Promise.all(
    visitsDoc.map((visitDoc) => convertVisitDocRef(visitDoc))
  );
  return visits;
};

const getCheckedEmployees = ({ employees }: VisitsFilters) => {
  const keys = Object.keys(employees) as (keyof typeof employees)[];
  return keys.filter((key) => employees[key]);
};

export const getCompanyVisits = async (
  companyId: string,
  filters: VisitsFilters,
  finished: boolean
): Promise<Visit[]> => {
  const checkedEmployees = getCheckedEmployees(filters);

  let q: Query<DocumentData>;
  const queryCommonItems = [
    visitsCollectionRef,
    where("companyId", "==", companyId),
    where("endAt", finished ? "<" : ">", new Date()),
    orderBy("endAt", finished ? "desc" : "asc"),
  ] as const;
  if (checkedEmployees.length > 0) {
    q = query(
      ...queryCommonItems,
      where(
        "employee",
        "in",
        checkedEmployees.map((userId) =>
          doc(db, "employees", userId.toString())
        )
      )
    );
  } else {
    q = query(...queryCommonItems);
  }

  const data = await getDocs(q);

  const visitsDoc = parseGetDocs<VisitDoc[]>(data);

  return (await convertVisitsDocRef(visitsDoc)).sort((a, b) => {
    if (finished) {
      return b.startAt.getTime() - a.startAt.getTime();
    } else {
      return a.startAt.getTime() - b.startAt.getTime();
    }
  });
};

export const getCalendarVisits = async (
  companyId: string,
  dateRange: [Date, Date],
  checkedEmployees: string[]
) => {
  if (checkedEmployees.length === 0) return [];
  const [startAt, endAt] = dateRange;
  const q = query(
    visitsCollectionRef,
    where("companyId", "==", companyId),
    where("startAt", ">", startAt),
    where("startAt", "<", endAt),
    where(
      "employee",
      "in",
      checkedEmployees.map((userId) => doc(db, "employees", userId))
    )
  );

  const data = await getDocs(q);

  const visitsDoc = parseGetDocs<VisitDoc[]>(data);

  return await convertVisitsDocRef(visitsDoc);
};

export const getVisit = async (visitId: string) => {
  const data = await getDoc(doc(db, "visits", visitId));

  const visitDoc = parseGetDoc<VisitDoc>(data);

  return await convertVisitDocRef(visitDoc);
};
