import { LocalizationProvider } from "@mui/lab";
import AuthContextProvider from "modules/auth/contexts/authContext";
import { QueryClient, QueryClientProvider } from "react-query";
import MuiThemeProviders from "./MuiThemeProviders";
import ToastProvider from "./ToastProvider";
import UserSettingsContextProvider from "./UserSettingsProvider";
import VisitsContextProvider from "./VisitsProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
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
                  locale={plLocale}>
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
