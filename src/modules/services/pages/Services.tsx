import { TabsContainer } from "common/components";
import { Tab } from "common/components/TabsBar/TabsBar";
import { useAuth } from "modules/auth/contexts/authContext";
import { useState } from "react";
import AllServices from "../components/AllServices/AllServices";
import Header from "../components/Header/Header";
import MyServices from "../components/MyServices/MyServices";
import Summary from "../components/Summary/Summary";
import ServicesContextProvider from "../contexts/servicesContext";

const tabs: Tab[] = [{ label: "Services" }, { label: "Summary" }];

const Services = () => {
  const [activeTab, setActiveTab] = useState(0);
  const changeTab = (newValue: number) => setActiveTab(newValue);
  const { user } = useAuth();

  return (
    <TabsContainer
      activeTab={activeTab}
      ariaLabel="services tabs bar"
      handleChangeTab={changeTab}
      tabs={tabs}>
      <ServicesContextProvider>
        <Header activeTab={activeTab} />
        {activeTab === 0 ? (
          user?.type === "customer" ? (
            <AllServices />
          ) : (
            <MyServices />
          )
        ) : null}
      </ServicesContextProvider>
      {activeTab === 1 ? <Summary /> : null}
    </TabsContainer>
  );
};

export default Services;
