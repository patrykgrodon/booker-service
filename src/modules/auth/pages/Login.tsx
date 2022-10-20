import { Box, Typography } from "@mui/material";
import { makeSx } from "common/styles/makeSx";
import LoginForm from "../components/LoginForm/LoginForm";

const sxContainer = makeSx(() => ({
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const sxFormContainer = makeSx((theme) => ({
  width: "450px",
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.primary.dark}`,
  padding: theme.spacing(5),
}));

const Login = () => {
  return (
    <Box sx={sxContainer}>
      <Box sx={sxFormContainer}>
        <Typography variant="h3" component="h1">
          Log in
        </Typography>
        <LoginForm />
      </Box>
    </Box>
  );
};

export default Login;
