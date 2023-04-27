import { Box, Typography } from "@mui/material";

type FormContainerProps = {
  children: React.ReactNode;
  title: string;
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
};

const FormContainer = ({ children, title, onSubmit }: FormContainerProps) => {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: 3,
        width: "430px",
        maxWidth: "95%",
      }}>
      <Typography variant="h3" component="h1">
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default FormContainer;
