export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  companyId: string;
};

export type CustomerFormValues = Omit<Customer, "id" | "companyId">;
