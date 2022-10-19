import { defaultAccounts } from "common/constants/defaultAccounts";
import {
  Account,
  AccountType,
  CreateCustomerAcc,
  CreateSellerAcc,
  CustomerFormValues,
  EditAccount,
  SellerFormValues,
} from "common/types";
import { createContext, useContext, useEffect, useState } from "react";
import { sleep } from "utils/sleep";
import { getLSItem, saveLSItem } from "utils/webStorage";
import { v4 as uuid } from "uuid";

interface AccountsContextState {
  accounts: Account[];
  createCustomerAcc: CreateCustomerAcc;
  createSellerAcc: CreateSellerAcc;
  editAccount: EditAccount;
}

const AcountsContext = createContext<AccountsContextState | null>(null);

interface AccountsContextProviderProps {
  children: React.ReactNode;
}

const emailExistError = "Account with that email already exists";

const checkIfEmailExist = (accounts: Account[], email: string) => {
  return accounts.find((account) => account.email === email.toLowerCase());
};

const createAccObj = <T extends AccountType>(
  type: T,
  values: T extends "customer" ? CustomerFormValues : SellerFormValues
) => {
  return {
    type,
    ...values,
    email: values.email.toLowerCase(),
    uuid: uuid(),
  };
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
      createAccObj("customer", values),
    ]);
  };

  const createSellerAcc: CreateSellerAcc = async (values) => {
    await sleep(800);
    if (checkIfEmailExist(accounts, values.email))
      throw new Error(emailExistError);
    setAccounts((prevState) => [
      ...prevState,
      { ...createAccObj("seller", values), services: [] },
    ]);
  };

  const editAccount: EditAccount = async (uuid, _, values) => {
    await sleep(800);
    const accIndex = accounts.findIndex((account) => account.uuid === uuid);
    if (accIndex === -1) throw new Error("Account not found");
    setAccounts((prevState) => {
      let accounts = [...prevState];
      accounts[accIndex] = { ...accounts[accIndex], ...values };
      return accounts;
    });
  };
  return (
    <AcountsContext.Provider
      value={{ accounts, createCustomerAcc, createSellerAcc, editAccount }}>
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
