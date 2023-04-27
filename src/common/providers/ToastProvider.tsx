import { createContext, useContext } from "react";
import { toast, ToastContainer, ToastContent } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type State = {
  setErrorMessage: (content: ToastContent) => void;
  setSuccessMessage: (content: ToastContent) => void;
  setWarningMessage: (content: ToastContent) => void;
  setInfoMessage: (content: ToastContent) => void;
};

const ToastContext = createContext<State | undefined>(undefined);

const toastSettings = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
} as const;

type Props = {
  children: React.ReactNode;
};

const ToastProvider = ({ children }: Props) => {
  const setSuccessMessage = (content: ToastContent) =>
    toast.success(content, {
      ...toastSettings,
    });

  const setErrorMessage = (content: ToastContent) =>
    toast.error(content, { ...toastSettings });

  const setWarningMessage = (content: ToastContent) =>
    toast.warning(content, {
      ...toastSettings,
    });

  const setInfoMessage = (content: ToastContent) =>
    toast.info(content, {
      ...toastSettings,
    });

  return (
    <ToastContext.Provider
      value={{
        setErrorMessage,
        setSuccessMessage,
        setWarningMessage,
        setInfoMessage,
      }}
    >
      <ToastContainer limit={4} theme="colored" />
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
