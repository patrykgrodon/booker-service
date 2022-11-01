import { useToastStyles } from "common/styles/useToastStyles";
import { createContext, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastContextState {
  setErrorMessage: (message: string) => void;
  setSuccessMessage: (message: string) => void;
  setWarningMessage: (message: string) => void;
  setInfoMessage: (message: string) => void;
}

const ToastContext = createContext<ToastContextState | undefined>(undefined);

interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const classes = useToastStyles();

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
