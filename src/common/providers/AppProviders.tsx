import AuthContextProvider from "modules/auth/contexts/authContext";
import { QueryClient, QueryClientProvider } from "react-query";
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
          <AuthContextProvider>{children}</AuthContextProvider>
        </ToastProvider>
      </QueryClientProvider>
    </MuiThemeProviders>
  );
};

export default AppProviders;
