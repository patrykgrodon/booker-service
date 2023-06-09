import { PageContainer } from "common/components";
import { AddVisitBtn, VisitsTable } from "../components";

const Visits = () => {
  return (
    <PageContainer title="My visits" button={<AddVisitBtn />}>
      <VisitsTable />
    </PageContainer>
  );
};

export default Visits;
