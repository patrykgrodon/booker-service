import { createTheme, responsiveFontSizes } from "@mui/material";

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
        sx: { textTransform: "none" },
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
    MuiTableRow: {
      defaultProps: {
        sx: {
          "&:last-child td": {
            border: "none",
          },
        },
      },
    },
  },
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
