import { Box } from "@mui/material";
import { useAuth } from "modules/auth/contexts/authContext";

const Dashboard = () => {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}>
      Welcome,{" "}
      {user.type === "customer"
        ? `${user.firstName} ${user.lastName}`
        : user.companyName}
    </Box>
  );
};

export default Dashboard;
