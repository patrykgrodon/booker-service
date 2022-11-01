import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import AuthContextProvider from "modules/auth/contexts/authContext";
import { QueryClient, QueryClientProvider } from "react-query";
import MuiThemeProviders from "./MuiThemeProviders";
import ToastProvider from "./ToastProvider";
import UserSettingsContextProvider from "./UserSettingsProvider";
import VisitsContextProvider from "./VisitsProvider";
import plLocale from "date-fns/locale/pl";

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
            <UserSettingsContextProvider>
              <VisitsContextProvider>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={plLocale}>
                  {children}
                </LocalizationProvider>
              </VisitsContextProvider>
            </UserSettingsContextProvider>
          </AuthContextProvider>
        </ToastProvider>
      </QueryClientProvider>
    </MuiThemeProviders>
  );
};

export default AppProviders;
