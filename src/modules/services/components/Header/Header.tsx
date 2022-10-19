import { Box, Typography } from "@mui/material";
import { makeSx } from "common/styles/makeSx";
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
  return (
    <Box sx={sxHeader}>
      <Typography variant="h2" component="h1">
        {activeTab === 0 ? "Your services" : "Statistics"}
      </Typography>
      {activeTab === 0 ? <AddServiceBtn /> : null}
    </Box>
  );
};

export default Header;
