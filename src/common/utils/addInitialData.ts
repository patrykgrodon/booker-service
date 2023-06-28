import { addDays, sub } from "date-fns";
import { addCustomer } from "modules/customers/api";
import { CustomerFormValues } from "modules/customers/types";
import { addEmployee } from "modules/employees/api";
import { EmployeeFormValues } from "modules/employees/types";
import { getDefaultCalendarColor } from "modules/employees/utils/getDefaultCalendarColor";
import { addService } from "modules/services/api";
import { ServiceFormValues } from "modules/services/types";
import { addVisit } from "modules/visits/api";

export const addInitialData = async (companyId: string) => {
  const services = await Promise.all(
    DUMMY_SERVICES.map((formValues) => addService(companyId, formValues))
  );
  const employees = await Promise.all(
    DUMMY_EMPLOYEES.map((formValues) => addEmployee(companyId, formValues))
  );
  const customers = await Promise.all(
    DUMMY_CUSTOMERS.map((formValues) => addCustomer(companyId, formValues))
  );

  await Promise.all(
    DUMMY_DATES.map((date, i) =>
      addVisit(
        companyId,
        {
          date,
          service: services[i].id,
          employee: employees[i].id,
          customer: customers[i].id,
        },
        DUMMY_SERVICES[i].duration
      )
    )
  );
};

const DUMMY_SERVICES: ServiceFormValues[] = [
  { name: "Wash & Cut", duration: "00:30", cost: 15 },
  { name: "Long Hair & Restyle", duration: "00:45", cost: 20 },
  { name: "Hair cut", duration: "00:30", cost: 25 },
  { name: "Skin Fade & Beard", duration: "01:00", cost: 30 },
];
const DUMMY_EMPLOYEES: EmployeeFormValues[] = [
  {
    firstName: "Garrett",
    lastName: "Destinee",
    phoneNumber: "7911202796",
    email: "garrett.destinee@gmail.com",
    calendarColor: getDefaultCalendarColor(),
  },
  {
    firstName: "Nick",
    lastName: "Dustin",
    phoneNumber: "7911223769",
    email: "nick.dustin@gmail.com",
    calendarColor: getDefaultCalendarColor(),
  },
  {
    firstName: "Jill",
    lastName: "Jream",
    phoneNumber: "7700024208",
    email: "jill.jream@gmail.com",
    calendarColor: getDefaultCalendarColor(),
  },
  {
    firstName: "Bennie",
    lastName: "Paxton",
    phoneNumber: "7520443030",
    email: "bennie.paxton@gmail.com",
    calendarColor: getDefaultCalendarColor(),
  },
];
const DUMMY_CUSTOMERS: CustomerFormValues[] = [
  {
    firstName: "Daryl",
    lastName: "Linwood",
    email: "daryl.linwood@gmail.com",
    phoneNumber: "7457778145",
  },
  {
    firstName: "Marlena",
    lastName: "Felisha",
    email: "marlena.felisha@gmail.com",
    phoneNumber: "7700003686",
  },
  {
    firstName: "Trista",
    lastName: "Wynne",
    email: "trista.wynne@gmail.com",
    phoneNumber: "7457488880",
  },
  {
    firstName: "Sophie",
    lastName: "Caitlin",
    email: "sophie.caitlyn@gmail.com",
    phoneNumber: "7700007167",
  },
];

const now = new Date();
now.setHours(12, 0, 0);

const DUMMY_DATES: [Date, Date, Date, Date] = [
  sub(now, { days: 1 }),
  addDays(now, 1),
  addDays(now, 2),
  addDays(now, 3),
];
