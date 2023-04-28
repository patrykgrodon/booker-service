import { Box } from "@mui/material";

type SidebarProps = {
  isOpen: boolean;
};

const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <Box sx={{ flexBasis: isOpen ? "100px" : "20px", transition: ".3s all" }}>
      Sidebar
    </Box>
  );
};

export default Sidebar;
