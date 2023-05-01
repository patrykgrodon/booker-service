import { ServicesTable, AddServiceBtn } from "../components";
import { PageContainer } from "common/components";

const Services = () => {
  return (
    <PageContainer title="My services" button={<AddServiceBtn />}>
      <ServicesTable />
    </PageContainer>
  );
};

export default Services;
