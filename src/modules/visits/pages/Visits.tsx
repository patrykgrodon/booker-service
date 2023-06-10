import { Paper, Tab, Tabs } from "@mui/material";
import { useState } from "react";

import { PageContainer } from "common/components";
import { AddVisitBtn, VisitsTable } from "../components";

export enum VisitsTableTabs {
  Incoming,
  Finished,
}

const Visits = () => {
  const [activeTab, setActiveTab] = useState<VisitsTableTabs>(
    VisitsTableTabs.Incoming
  );
  return (
    <PageContainer title="Visits" button={<AddVisitBtn />}>
      <Paper>
        <Tabs
          value={activeTab}
          onChange={(_, val) => setActiveTab(val)}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Tab label="Incoming" />
          <Tab label="Finished" />
        </Tabs>
      </Paper>
      <VisitsTable activeTab={activeTab} />
    </PageContainer>
  );
};

export default Visits;
