import { PageContainer } from "common/components";
import { AddEmployeeBtn, EmployeesTable } from "../components";

const Employees = () => {
  return (
    <PageContainer title="My employees" button={<AddEmployeeBtn />}>
      <EmployeesTable />
    </PageContainer>
  );
};

export default Employees;
