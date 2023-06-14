import { PageContainer } from "common/components";
import { CalendarView } from "../components";
import CalendarFilters from "../components/CalendarView/CalendarFilters";

const Calendar = () => {
  return (
    <PageContainer title="Calendar" button={<CalendarFilters />}>
      <CalendarView />
    </PageContainer>
  );
};

export default Calendar;
