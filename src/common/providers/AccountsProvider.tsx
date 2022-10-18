import { Account, CreateCustomerAcc, CreateSellerAcc } from "common/types";
import { createContext, useContext, useEffect, useState } from "react";
import { sleep } from "utils/sleep";
import { getLSItem, saveLSItem } from "utils/webStorage";

interface AccountsContextState {
  accounts: Account[];
  createCustomerAcc: CreateCustomerAcc;
  createSellerAcc: CreateSellerAcc;
}

const AcountsContext = createContext<AccountsContextState | null>(null);

interface AccountsContextProviderProps {
  children: React.ReactNode;
}

const defaultAccounts: Account[] = [
  {
    type: "seller",
    email: "patryk@gmail.com",
    address: "ul. Krótka 21 44-300 Wodzisław Śląski",
    companyName: "Hairdresser",
    phoneNumber: "+48 532 123 982",
    password: "123",
  },
  {
    type: "customer",
    email: "wiktoria@gmail.com",
    password: "123",
    firstName: "Wiktoria",
    lastName: "Grodoń",
    phoneNumber: "+48 531 323 382",
  },
  {
    type: "customer",
    email: "william@gmail.com",
    password: "123",
    firstName: "William",
    lastName: "Grodoń",
    phoneNumber: "+48 533 223 462",
  },
];

const emailExistError = "Account with that email already exists";

const checkIfEmailExist = (accounts: Account[], email: string) => {
  return accounts.find((account) => account.email === email.toLowerCase());
};

const AcountsContextProvider = ({ children }: AccountsContextProviderProps) => {
  const lsAccountsName = "accounts";
  const lsAccounts = getLSItem<Account[]>(lsAccountsName);
  const [accounts, setAccounts] = useState(lsAccounts || defaultAccounts);

  useEffect(() => {
    saveLSItem(lsAccountsName, accounts);
  }, [accounts]);

  const createCustomerAcc: CreateCustomerAcc = async (values) => {
    await sleep(800);
    if (checkIfEmailExist(accounts, values.email))
      throw new Error(emailExistError);
    setAccounts((prevState) => [
      ...prevState,
      { type: "customer", ...values, email: values.email.toLowerCase() },
    ]);
  };

  const createSellerAcc: CreateSellerAcc = async (values) => {
    await sleep(800);
    if (checkIfEmailExist(accounts, values.email))
      throw new Error(emailExistError);
    setAccounts((prevState) => [
      ...prevState,
      { type: "seller", ...values, email: values.email.toLowerCase() },
    ]);
  };

  return (
    <AcountsContext.Provider
      value={{ accounts, createCustomerAcc, createSellerAcc }}>
      {children}
    </AcountsContext.Provider>
  );
};

const useAccounts = () => {
  const context = useContext(AcountsContext);
  if (!context) {
    throw new Error("AcountsContext must be used within provider");
  }
  return context;
};

export { useAccounts };
export default AcountsContextProvider;
