import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import theme from "theme";

type MuiThemeProvidersProps = {
  children: React.ReactNode;
};

const MuiThemeProviders = ({ children }: MuiThemeProvidersProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: { height: "100vh", "& #root": { height: "100%" } },
        }}
      />
      {children}
    </ThemeProvider>
  );
};

export default MuiThemeProviders;
