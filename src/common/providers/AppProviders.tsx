import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MuiThemeProviders from "./MuiThemeProviders";

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
        {children};
      </QueryClientProvider>
    </MuiThemeProviders>
  );
};

export default AppProviders;
