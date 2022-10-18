import AuthContextProvider from "modules/auth/contexts/authContext";
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
            <AuthContextProvider>{children}</AuthContextProvider>
          </AcountsContextProvider>
        </ToastProvider>
      </QueryClientProvider>
    </MuiThemeProviders>
  );
};

export default AppProviders;
