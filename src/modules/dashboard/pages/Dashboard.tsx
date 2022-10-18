import { Box } from "@mui/material";
import { useAuth } from "modules/auth/contexts/authContext";

const Dashboard = () => {
  const { account } = useAuth();
  if (!account) return null;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}>
      Witaj,{" "}
      {account.type === "customer"
        ? `${account.firstName} ${account.lastName}`
        : account.companyName}
    </Box>
  );
};

export default Dashboard;
