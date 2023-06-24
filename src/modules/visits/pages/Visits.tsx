import { Paper, Tab, Tabs } from "@mui/material";
import { useState } from "react";

import { PageContainer } from "common/components";
import { AddVisitBtn, VisitsTable } from "../components";
import VisitsTableFilters from "../components/VisitsTableFilters";
import useVisitsFilters from "../hooks/useVisitsFilters";

export enum VisitsTableTabs {
  Incoming,
  Finished,
}

const Visits = () => {
  const [activeTab, setActiveTab] = useState<VisitsTableTabs>(
    VisitsTableTabs.Incoming
  );
  const { changeFilters, visitsFilters } = useVisitsFilters();
  return (
    <PageContainer title="Visits" button={<AddVisitBtn />}>
      <Paper
        sx={{
          position: "relative",
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(_, val) => setActiveTab(val)}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Tab label="Incoming" />
          <Tab label="Finished" />
        </Tabs>
        <VisitsTableFilters
          filters={visitsFilters}
          changeFilters={changeFilters}
        />
      </Paper>
      <VisitsTable activeTab={activeTab} />
    </PageContainer>
  );
};

export default Visits;
