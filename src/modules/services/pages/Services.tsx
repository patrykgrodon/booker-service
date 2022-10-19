import { TabsContainer } from "common/components";
import { Tab } from "common/components/TabsBar/TabsBar";
import { useState } from "react";
import Header from "../components/Header/Header";
import ServicesTable from "../components/ServicesTable/ServicesTable";
import Summary from "../components/Summary/Summary";

const tabs: Tab[] = [{ label: "Services" }, { label: "Summary" }];

const Services = () => {
  const [activeTab, setActiveTab] = useState(0);

  const changeTab = (newValue: number) => setActiveTab(newValue);

  return (
    <TabsContainer
      activeTab={activeTab}
      ariaLabel="services tabs bar"
      handleChangeTab={changeTab}
      tabs={tabs}>
      <Header activeTab={activeTab} />
      {activeTab === 0 ? <ServicesTable /> : null}
      {activeTab === 1 ? <Summary /> : null}
    </TabsContainer>
  );
};

export default Services;
