export type ServiceType = string;

export interface Service {
  name: string;
  type: ServiceType;
  duration: string;
  cost: number;
}
