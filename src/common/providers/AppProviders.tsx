import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MuiThemeProviders, ToastProvider } from ".";
import { AuthContextProvider } from "modules/auth/contexts";

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
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <AuthContextProvider>{children}</AuthContextProvider>
        </ToastProvider>
      </QueryClientProvider>
    </MuiThemeProviders>
  );
};

export default AppProviders;
