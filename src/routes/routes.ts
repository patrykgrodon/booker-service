export const routes = {
  base: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  services: "/services",
} as const;

export type Route = (typeof routes)[keyof typeof routes];
