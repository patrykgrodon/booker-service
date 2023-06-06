import { PageContainer } from "common/components";
import { AddVisitBtn } from "../components";

const Visits = () => {
  return (
    <PageContainer title="My visits" button={<AddVisitBtn />}>
      Visits
    </PageContainer>
  );
};

export default Visits;
