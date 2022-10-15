import {
  createTheme,
  responsiveFontSizes,
  unstable_createMuiStrictModeTheme,
} from "@mui/material";

export const GLOBAL_FONTSIZE = 14;

let theme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          "@media screen and (max-width: 600px)": {
            marginLeft: 0,
            marginRight: 0,
          },
        },
      },
    },
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
    fontFamily: `"Roboto","Lato", "Segoe UI", "sans-serif"`,
    fontWeightLight: 400,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontSize: "3rem",
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.5rem",
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 700,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 700,
    },
    button: {
      fontSize: "1rem",
      textTransform: "none",
      fontWeight: 400,
    },
    caption: {
      fontSize: "0.875rem",
    },
  },
  palette: {
    background: {
      default: "#f0f1f2",
    },
    primary: {
      dark: "#344a5f",
      main: "#4485BB",
      light: "#89C5FA",
      "100": "#ECF6FF",
      "200": "#DDEEFF",
    },
    secondary: {
      main: "#FFC947",
      dark: "#FFC08D",
    },
    error: {
      light: "#FFC2C2",
      main: "#EB5757",
      dark: "#C74D4D",
    },
    grey: {
      "100": "#EFEFEF",
      "200": "#DADADA",
      "300": "#C9C9C9",
      "400": "#AFAFAF",
      "500": "#898989",
      "600": "#717171",
      "700": "#585858",
    },
    text: {
      primary: "#344A5F",
      secondary: "#717171",
    },
    action: {
      active: "rgba(0, 0, 0, 0.40)",
    },
    divider: "#DADADA",
  },
  shape: {
    borderRadius: 5,
  },
});

theme = responsiveFontSizes(theme);
// UNSTABLE THEME MODE IN DEVELOPMENT TO AVOID STRICT MODE WARNINGS
if (process.env.NODE_ENV === "development") {
  theme = unstable_createMuiStrictModeTheme(theme);
}

export default theme;
