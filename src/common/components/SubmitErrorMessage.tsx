import { Typography, TypographyProps } from "@mui/material";

type SubmitErrorMessageProps = TypographyProps & { error: string };

const SubmitErrorMessage = ({ error, ...props }: SubmitErrorMessageProps) => {
  return (
    <Typography variant="body1" color="error" align="center" {...props}>
      {error}
    </Typography>
  );
};

export default SubmitErrorMessage;
