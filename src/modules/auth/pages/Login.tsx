import { Box, Card, Typography } from "@mui/material";
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
  padding: theme.spacing(5),
}));

const Login = () => {
  return (
    <Box sx={sxContainer}>
      <Card sx={sxFormContainer}>
        <Typography variant="h3" component="h1">
          Log in
        </Typography>
        <LoginForm />
      </Card>
    </Box>
  );
};

export default Login;
