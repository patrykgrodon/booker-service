import { useState } from "react";

import { PageContainer } from "common/components";
import { CalendarView } from "../components";
import CalendarFilters from "../components/CalendarView/CalendarFilters";

export const lsCheckedUsers = "";

const Calendar = () => {
  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);

  const changeCheckedUsers = (newCheckedUsers: string[]) => {
    setCheckedUsers(newCheckedUsers);
  };

  return (
    <PageContainer
      title="Calendar"
      button={
        <CalendarFilters
          checkedUsers={checkedUsers}
          changeCheckedUsers={changeCheckedUsers}
        />
      }
    >
      <CalendarView checkedUsers={checkedUsers} />
    </PageContainer>
  );
};

export default Calendar;
