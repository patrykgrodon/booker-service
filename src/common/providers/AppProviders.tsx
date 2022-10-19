import AuthContextProvider from "modules/auth/contexts/authContext";
import ServicesContextProvider from "modules/services/contexts/servicesContext";
import { QueryClient, QueryClientProvider } from "react-query";
import AcountsContextProvider from "./AccountsProvider";
import MuiThemeProviders from "./MuiThemeProviders";
import ToastProvider from "./ToastProvider";

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
  const queryClient = new QueryClient();
  return (
    <MuiThemeProviders>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <AcountsContextProvider>
            <AuthContextProvider>
              <ServicesContextProvider>{children}</ServicesContextProvider>
            </AuthContextProvider>
          </AcountsContextProvider>
        </ToastProvider>
      </QueryClientProvider>
    </MuiThemeProviders>
  );
};

export default AppProviders;
