export type Service = {
  id: string;
  name: string;
  cost: number;
  duration: string;
  companyId: string;
};

export type ServiceFormValues = Omit<Service, "id" | "companyId">;

export type AddService = (formValues: ServiceFormValues) => Promise<void>;
export type EditService = (
  id: string,
  formValues: ServiceFormValues
) => Promise<void>;
export type DeleteService = (id: string) => Promise<void>;
