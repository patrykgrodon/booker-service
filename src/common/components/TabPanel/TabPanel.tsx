import { Box } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      component="div"
      sx={{ flex: 1 }}
      role="tabpanel"
      hidden={value !== index}
      aria-labelledby={`tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 3, height: "100%" }}>{children}</Box>}
    </Box>
  );
};

export default TabPanel;
