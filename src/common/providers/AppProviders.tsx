import { QueryClient, QueryClientProvider } from "react-query";
import MuiThemeProviders from "./MuiThemeProviders";
import ToastProvider from "./ToastProvider";

interface AppProvidersProps {
  children: React.ReactNode;
}

declare module "react-query/types/react/QueryClientProvider" {
  interface QueryClientProviderProps {
    children?: React.ReactNode;
  }
}

const AppProviders = ({ children }: AppProvidersProps) => {
  const queryClient = new QueryClient();
  return (
    <MuiThemeProviders>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>{children}</ToastProvider>
      </QueryClientProvider>
    </MuiThemeProviders>
  );
};

export default AppProviders;
