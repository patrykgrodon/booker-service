import { PageContainer } from "common/components";
import { AddEmployeeBtn } from "../components";

const Employees = () => {
  return (
    <PageContainer title="My employees" button={<AddEmployeeBtn />}>
      Employees
    </PageContainer>
  );
};

export default Employees;
