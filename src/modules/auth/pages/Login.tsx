import { Box, Theme, Typography } from "@mui/material";
import LoginForm from "../components/LoginForm/LoginForm";

const sxContainer = {
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const sxFormContainer = (theme: Theme) => ({
  width: "450px",
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.primary.dark}`,
  padding: theme.spacing(5),
});

const Login = () => {
  return (
    <Box sx={sxContainer}>
      <Box sx={sxFormContainer}>
        <Typography variant="h3" component="h1">
          Zaloguj się
        </Typography>
        <LoginForm />
      </Box>
    </Box>
  );
};

export default Login;
