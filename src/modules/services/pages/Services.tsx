import { ServicesTable, AddServiceBtn } from "../components";
import { PageContainer } from "common/components";

const Services = () => {
  return (
    <PageContainer title="Services" button={<AddServiceBtn />}>
      <ServicesTable />
    </PageContainer>
  );
};

export default Services;
