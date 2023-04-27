export const routes = {
  base: "/",
  login: "/login",
} as const;

export type Route = keyof typeof routes;
