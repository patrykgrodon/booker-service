import { Box, Card, Tab, Tabs } from "@mui/material";
import TabPanel from "common/components/TabPanel/TabPanel";
import { makeSx } from "common/styles/makeSx";
import { useState } from "react";
import CustomerForm from "../components/CustomerForm/CustomerForm";
import ServiceProviderForm from "../components/ServiceProviderForm/ServiceProviderForm";

const sxContainer = makeSx(() => ({
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const sxCard = makeSx(() => ({
  width: "600px",
  minHeight: "350px",
  display: "flex",
  flexDirection: "column",
}));

const CreateAccount = () => {
  const [tab, setTab] = useState(0);
  return (
    <Box sx={sxContainer}>
      <Card sx={sxCard}>
        <Tabs
          sx={{
            borderBottom: (theme) => `1px solid ${theme.palette.grey[300]}`,
          }}
          value={tab}
          onChange={(_, newValue) => setTab(newValue)}
          aria-label="account type tabs">
          <Tab label="Customer" sx={{ flexBasis: "50%" }} />
          <Tab label="Service provider" sx={{ flexBasis: "50%" }} />
        </Tabs>
        <TabPanel index={0} value={tab}>
          <CustomerForm />
        </TabPanel>
        <TabPanel index={1} value={tab}>
          <ServiceProviderForm />
        </TabPanel>
      </Card>
    </Box>
  );
};

export default CreateAccount;
