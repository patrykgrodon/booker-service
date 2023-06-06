import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MuiThemeProviders, ToastProvider } from ".";
import { AuthContextProvider } from "modules/auth/contexts";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import enUS from "date-fns/locale/en-US";

type AppProvidersProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    },
  },
});

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <MuiThemeProviders>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enUS}>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <AuthContextProvider>{children}</AuthContextProvider>
          </ToastProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </MuiThemeProviders>
  );
};

export default AppProviders;
