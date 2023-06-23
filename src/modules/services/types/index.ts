export type Service = {
  id: string;
  name: string;
  cost: number;
  duration: string;
  companyId: string;
};

export type ServiceFormValues = Omit<Service, "id" | "companyId">;
