import { useState, useCallback } from "react";

import { PageContainer } from "common/components";
import { CalendarView } from "../components";
import CalendarFilters from "../components/CalendarView/CalendarFilters";
import { getLSItem, saveLSItem } from "common/utils/webStorage";
import { lsNames } from "common/constants/webStorageItems";

const Calendar = () => {
  const lsCheckedEmployees = getLSItem<string[] | undefined>(
    lsNames.calendar.checkedEmployees
  );

  const [checkedEmployees, setCheckedEmployees] = useState<string[]>(
    lsCheckedEmployees || []
  );

  const changeCheckedEmployees = useCallback((newCheckedUsers: string[]) => {
    setCheckedEmployees(newCheckedUsers);
    saveLSItem(lsNames.calendar.checkedEmployees, newCheckedUsers);
  }, []);

  return (
    <PageContainer
      title="Calendar"
      button={
        <CalendarFilters
          checkedEmployees={checkedEmployees}
          changeCheckedEmployees={changeCheckedEmployees}
        />
      }
    >
      <CalendarView checkedEmployees={checkedEmployees} />
    </PageContainer>
  );
};

export default Calendar;
