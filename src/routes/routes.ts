export const routes = {
  base: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  calendar: "/calendar",
  visits: "/visits",
  customers: "/customers",
  employees: "/employees",
  services: "/services",
  settings: "/settings",
} as const;

export type Route = (typeof routes)[keyof typeof routes];
