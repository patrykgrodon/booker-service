import { Typography, TypographyProps } from "@mui/material";

type SubmitErrorMessageProps = TypographyProps & { error: string };

const SubmitErrorMessage = ({ error, ...props }: SubmitErrorMessageProps) => {
  return (
    <Typography variant="caption" color="error" {...props}>
      {error}
    </Typography>
  );
};

export default SubmitErrorMessage;
