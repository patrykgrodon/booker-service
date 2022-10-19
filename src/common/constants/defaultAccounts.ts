import { Account } from "common/types";
import { v4 as uuid } from "uuid";

export const defaultAccounts: Account[] = [
  {
    uuid: uuid(),
    type: "seller",
    email: "patryk@gmail.com",
    address: "ul. Krótka 21 44-300 Wodzisław Śląski",
    companyName: "Hairdresser",
    phoneNumber: "+48 532 123 982",
    password: "123",
    services: [
      {
        name: "Barber",
        cost: "30",
        duration: "01:00",
        type: "Hairdresser",
        uuid: uuid(),
      },
    ],
  },
  {
    uuid: uuid(),
    type: "customer",
    email: "wiktoria@gmail.com",
    password: "123",
    firstName: "Wiktoria",
    lastName: "Grodoń",
    phoneNumber: "+48 531 323 382",
  },
  {
    uuid: uuid(),
    type: "customer",
    email: "william@gmail.com",
    password: "123",
    firstName: "William",
    lastName: "Grodoń",
    phoneNumber: "+48 533 223 462",
  },
];
