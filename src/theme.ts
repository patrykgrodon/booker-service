import { createTheme, responsiveFontSizes } from "@mui/material";

export const GLOBAL_FONTSIZE = 14;

let theme = createTheme({
  components: {
    MuiModal: {
      defaultProps: {
        disableEnforceFocus: true,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableTouchRipple: true,
        style: {
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        color: "primary",
        variant: "contained",
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiCheckbox: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "0.875rem",
        },
      },
      defaultProps: {
        disableInteractive: true,
      },
    },
  },
  spacing: GLOBAL_FONTSIZE / 2,
  typography: {
    fontFamily: `"Lato", "Segoe UI", "sans-serif"`,
    fontWeightLight: 400,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  palette: {
    mode: "dark",
  },
  shape: {
    borderRadius: 5,
  },
});

theme = responsiveFontSizes(theme);

export default theme;
