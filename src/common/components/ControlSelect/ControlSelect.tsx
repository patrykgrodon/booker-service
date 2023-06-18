import {
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
  Select,
  SelectProps,
  MenuItem,
} from "@mui/material";
import { forwardRef } from "react";
import { FieldError } from "react-hook-form";

type ControlSelectProps = Omit<SelectProps, "error" | "children"> & {
  id: string;
  label: string;
  options: { label: string; value: string }[];
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
      fullWidth = true,
      size,
      containerProps,
      options,
      ...props
    }: ControlSelectProps,
    ref
  ) => {
    return (
      <FormControl
        variant="outlined"
        fullWidth={fullWidth}
        size={size}
        {...containerProps}
      >
        <InputLabel error={Boolean(error)} id={id}>
          {label}
        </InputLabel>
        <Select
          {...props}
          ref={ref}
          labelId={id}
          id={id}
          label={label}
          error={Boolean(error)}
        >
          {options.map(({ value, label }) => (
            <MenuItem key={value} value={value} aria-label={label}>
              {label}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText error>{error.message}</FormHelperText>}
      </FormControl>
    );
  }
);
export default ControlSelect;
