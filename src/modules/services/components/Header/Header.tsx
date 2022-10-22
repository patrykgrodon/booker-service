import { Box, Typography } from "@mui/material";
import { makeSx } from "common/styles/makeSx";
import { useAuth } from "modules/auth/contexts/authContext";
import AddServiceBtn from "../AddServiceBtn/AddServiceBtn";

const sxHeader = makeSx((theme) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(3),
}));

interface HeaderProps {
  activeTab: number;
}

const Header = ({ activeTab }: HeaderProps) => {
  const { user } = useAuth();
  const title =
    activeTab === 0
      ? user?.type === "customer"
        ? "Book service"
        : "Your services"
      : "Statistics";
  return (
    <Box sx={sxHeader}>
      <Typography variant="h2" component="h1">
        {title}
      </Typography>
      {activeTab === 0 && user?.type === "serviceProvider" ? (
        <AddServiceBtn />
      ) : null}
    </Box>
  );
};

export default Header;
