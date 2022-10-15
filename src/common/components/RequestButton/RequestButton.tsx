import { Button, ButtonProps } from "@mui/material";
import Spinner from "../Spinner/Spinner";

type Props = ButtonProps & {
  isLoading?: boolean;
  children: React.ReactNode | string;
};

const RequestButton = ({
  isLoading = false,
  children,
  disabled,
  ...props
}: Props) => {
  return (
    <Button {...props} disabled={disabled || isLoading}>
      {isLoading ? <Spinner button size="small" color="inherit" /> : children}
    </Button>
  );
};
export default RequestButton;
