import { makeStyles } from "./makeStyles";

export const useToastStyles = makeStyles((theme) => ({
  toastContainer: {
    fontSize: theme.typography.subtitle2.fontSize,
    fontFamily: theme.typography.fontFamily,
    marginTop: theme.spacing(8),
  },
  successToast: {
    backgroundColor: `${theme.palette.success.main} !important`,
  },
  errorToast: {
    backgroundColor: `${theme.palette.error.main} !important`,
  },
  warningToast: {
    backgroundColor: `#f3ae4e !important`,
  },
  infoToast: {
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
}));
