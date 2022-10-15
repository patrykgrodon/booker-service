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
      Witaj, {user.firstName} {user.lastName}
    </Box>
  );
};

export default Dashboard;
