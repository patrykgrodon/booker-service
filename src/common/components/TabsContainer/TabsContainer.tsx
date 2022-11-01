import { Container } from "@mui/material";
import React from "react";
import { TabsBar } from "common/components";
import useTabsContainerStyles from "./styles";
import { Tab } from "../TabsBar/TabsBar";

interface TabsContainerProps {
  ariaLabel: string;
  activeTab: number;
  handleChangeTab: (newValue: number) => void;
  tabs: Tab[];
  children: React.ReactNode;
}

const TabsContainer = React.memo(
  ({
    ariaLabel,
    activeTab,
    handleChangeTab,
    tabs,
    children,
  }: TabsContainerProps) => {
    const classes = useTabsContainerStyles();
    return (
      <Container className={classes.mainContainer}>
        <TabsBar
          ariaLabel={ariaLabel}
          activeTab={activeTab}
          handleChangeTab={handleChangeTab}
          tabs={tabs}
        />
        <Container className={classes.contentContainer}>{children}</Container>
      </Container>
    );
  }
);

export default TabsContainer;
