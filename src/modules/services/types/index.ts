export type ServiceType = string;
export interface Service {
  name: string;
  type: ServiceType;
  duration: string;
  cost: string;
  uuid: string;
}
export type ServiceFormValues = Omit<Service, "uuid">;

export type AddService = (service: ServiceFormValues) => Promise<void>;
export type DeleteService = (uuid: string) => Promise<void>;
export type EditService = (
  uuid: string,
  service: Partial<ServiceFormValues>
) => Promise<void>;
