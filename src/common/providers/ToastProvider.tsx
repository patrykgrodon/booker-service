import { createContext, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { css, Theme, useTheme } from "@mui/material/styles";
import { css as emotionCss } from "@emotion/css";
import "react-toastify/dist/ReactToastify.css";

type State = {
  setErrorMessage: (message: string) => void;
  setSuccessMessage: (message: string) => void;
  setWarningMessage: (message: string) => void;
  setInfoMessage: (message: string) => void;
};

const ToastContext = createContext<State | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

// toast.configure({ theme: "colored", className });

const myStyles = {
  toastContainer: (theme: Theme) => ({
    fontSize: theme.typography.subtitle2.fontSize,
    fontFamily: theme.typography.fontFamily,
    marginTop: theme.spacing(8),
  }),
  successToast: (theme: Theme) => ({
    backgroundColor: `${theme.palette.success.main} !important`,
  }),
  errorToast: (theme: Theme) => ({
    backgroundColor: `${theme.palette.error.main} !important`,
  }),
  warningToast: {
    backgroundColor: `#f3ae4e !important`,
  },
  infoToast: (theme: Theme) => ({
    backgroundColor: `${theme.palette.primary.main} !important`,
  }),
};

const ToastProvider = ({ children }: Props) => {
  const theme = useTheme();

  // first we need to convert to something emotion can understand
  const toastContainerClass = css(myStyles.toastContainer(theme));
  const successToastClass = css(myStyles.successToast(theme));
  const errorToastClass = css(myStyles.errorToast(theme));
  const warningToastClass = css(myStyles.warningToast);
  const infoToastClass = css(myStyles.infoToast(theme));

  // now we can pass to emotion
  const toastContainerClassName = emotionCss(toastContainerClass.styles);
  const successToastClassClassName = emotionCss(successToastClass.styles);
  const errorToastClassName = emotionCss(errorToastClass.styles);
  const warningToastClassName = emotionCss(warningToastClass.styles);
  const infoToastClassName = emotionCss(infoToastClass.styles);

  const classes = {
    successToast: successToastClassClassName,
    errorToast: errorToastClassName,
    warningToast: warningToastClassName,
    infoToast: infoToastClassName,
    toastContainer: toastContainerClassName,
  };

  const toastSettings = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  } as const;

  const setSuccessMessage = (text: string) =>
    toast.success(text, { ...toastSettings, className: classes.successToast });

  const setErrorMessage = (text: string) =>
    toast.error(text, { ...toastSettings, className: classes.errorToast });

  const setWarningMessage = (text: string) =>
    toast.warning(text, { ...toastSettings, className: classes.warningToast });

  const setInfoMessage = (text: string) =>
    toast.info(text, { ...toastSettings, className: classes.infoToast });

  return (
    <ToastContext.Provider
      value={{
        setErrorMessage,
        setSuccessMessage,
        setWarningMessage,
        setInfoMessage,
      }}>
      <ToastContainer
        limit={4}
        theme="colored"
        className={classes.toastContainer}
      />
      {children}
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw Error("Toast context must be used within provider");
  }
  return context;
};

export { useToast };

export default ToastProvider;
