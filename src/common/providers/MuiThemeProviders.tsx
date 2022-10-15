import {
  CssBaseline,
  ThemeProvider,
  StyledEngineProvider,
  GlobalStyles,
} from "@mui/material";
import theme, { GLOBAL_FONTSIZE } from "../styles/theme";

type Props = {
  children: React.ReactNode;
};

const MuiThemeProviders = ({ children }: Props) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { fontSize: GLOBAL_FONTSIZE } }} />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default MuiThemeProviders;
