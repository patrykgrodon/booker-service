export type ServiceType = "Hairdresser" | "Nails" | string;
export interface Service {
  name: string;
  type: ServiceType;
  duration: string;
  cost: string;
  id: string;
  city: string;
  companyName: string;
  userId: string;
}
export type ServiceFormValues = Omit<
  Service,
  "id" | "city" | "companyName" | "userId"
>;

export type AddService = (service: ServiceFormValues) => Promise<void>;
export type DeleteService = (id: string) => Promise<void>;
export type EditService = (
  id: string,
  service: Partial<ServiceFormValues>
) => Promise<void>;
