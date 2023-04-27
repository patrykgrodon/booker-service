export const routes = {
  login: "/login",
} as const;

export type Routes = keyof typeof routes;
