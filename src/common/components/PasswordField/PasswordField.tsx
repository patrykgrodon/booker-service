import { IconButton, TextField, TextFieldProps } from "@mui/material";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { forwardRef, useState } from "react";

const PasswordField = forwardRef(({ ...props }: TextFieldProps, ref: any) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisible = () =>
    setPasswordVisible((isVisible) => !isVisible);
  return (
    <TextField
      {...props}
      ref={ref}
      type={isPasswordVisible ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <IconButton
            size="small"
            aria-label={
              isPasswordVisible ? "Wyłącz podgląd hasła" : "Włącz podgląd hasła"
            }
            onClick={togglePasswordVisible}>
            {isPasswordVisible ? (
              <VisibilityOffOutlined />
            ) : (
              <VisibilityOutlined />
            )}
          </IconButton>
        ),
      }}
    />
  );
});
export default PasswordField;
