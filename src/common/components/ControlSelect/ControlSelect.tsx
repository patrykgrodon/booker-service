import {
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
  Select,
  SelectProps,
} from "@mui/material";
import { forwardRef } from "react";
import { FieldError } from "react-hook-form";

type ControlSelectProps = Omit<SelectProps, "error"> & {
  id: string;
  label: string;
  children: React.ReactNode;
  error?: FieldError;
  fullWidth?: boolean;
  size?: string;
  containerProps?: FormControlProps;
};

const ControlSelect = forwardRef(
  (
    {
      id,
      error,
      label,
      children,
      fullWidth = true,
      size,
      containerProps,
      ...props
    }: ControlSelectProps,
    ref
  ) => {
    return (
      <FormControl
        variant="outlined"
        fullWidth={fullWidth}
        size={size}
        {...containerProps}>
        <InputLabel error={Boolean(error)} id={id}>
          {label}
        </InputLabel>
        <Select
          {...props}
          ref={ref}
          labelId={id}
          id={id}
          label={label}
          error={Boolean(error)}>
          {children}
        </Select>
        {error && <FormHelperText error>{error.message}</FormHelperText>}
      </FormControl>
    );
  }
);
export default ControlSelect;
