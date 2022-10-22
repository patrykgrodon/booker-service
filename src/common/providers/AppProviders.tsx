import AuthContextProvider from "modules/auth/contexts/authContext";
import { QueryClient, QueryClientProvider } from "react-query";
import MuiThemeProviders from "./MuiThemeProviders";
import ToastProvider from "./ToastProvider";
import VisitsContextProvider from "./VisitsProvider";

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchInterval: false,
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <MuiThemeProviders>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <AuthContextProvider>
            <VisitsContextProvider>{children}</VisitsContextProvider>
          </AuthContextProvider>
        </ToastProvider>
      </QueryClientProvider>
    </MuiThemeProviders>
  );
};

export default AppProviders;
