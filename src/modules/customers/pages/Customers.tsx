import { PageContainer } from "common/components";
import { AddCustomerBtn, CustomersTable } from "../components";

const Customers = () => {
  return (
    <PageContainer title="Customers" button={<AddCustomerBtn />}>
      <CustomersTable />
    </PageContainer>
  );
};

export default Customers;
