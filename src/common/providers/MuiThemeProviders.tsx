import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import theme, { GLOBAL_FONTSIZE } from "theme";

type MuiThemeProvidersProps = {
  children: React.ReactNode;
};

const MuiThemeProviders = ({ children }: MuiThemeProvidersProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          html: { fontSize: GLOBAL_FONTSIZE },
          body: { height: "100vh", "& #root": { height: "100%" } },
        }}
      />
      {children}
    </ThemeProvider>
  );
};

export default MuiThemeProviders;
