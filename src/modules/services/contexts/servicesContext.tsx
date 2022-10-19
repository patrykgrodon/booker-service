import { useAccounts } from "common/providers/AccountsProvider";
import { useAuth } from "modules/auth/contexts/authContext";
import { createContext, useContext, useEffect, useState } from "react";
import { AddService, DeleteService, EditService, Service } from "../types";
import { v4 as uuid } from "uuid";

interface ServicesContextState {
  myServices: Service[] | null;
  addService: AddService;
  deleteService: DeleteService;
  editService: EditService;
}

const ServicesContext = createContext<ServicesContextState | null>(null);

interface ServicesContextProviderProps {
  children: React.ReactNode;
}

const ServicesContextProvider = ({
  children,
}: ServicesContextProviderProps) => {
  const { account } = useAuth();
  const { editAccount } = useAccounts();

  const [myServices, setMyServices] = useState(
    account?.type === "seller" ? account.services : null
  );

  useEffect(() => {
    setMyServices(account?.type === "seller" ? account.services : null);
  }, [account]);

  if (account && account.type === "customer") return null;

  const addService: AddService = async (service) => {
    if (!account) return;

    const newService = { ...service, uuid: uuid() };
    await editAccount(account.uuid, "seller", {
      services: [...account.services, newService],
    });
  };
  const deleteService: DeleteService = async (uuid) => {
    if (!account) return;
    let services = [...account.services];
    services = services.filter((service) => service.uuid !== uuid);
    await editAccount(account.uuid, "seller", { services });
  };
  const editService: EditService = async (uuid, service) => {
    if (!account) return;
    let services = [...account.services];
    const serviceToEditIndex = services.findIndex(
      (service) => service.uuid === uuid
    );
    services[serviceToEditIndex] = {
      ...services[serviceToEditIndex],
      ...service,
    };
    await editAccount(account.uuid, "seller", {
      services,
    });
  };

  return (
    <ServicesContext.Provider
      value={{ myServices, addService, deleteService, editService }}>
      {children}
    </ServicesContext.Provider>
  );
};

const useServices = () => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error("ServicesContext must be used within provider");
  }
  return context;
};

export { useServices };
export default ServicesContextProvider;
