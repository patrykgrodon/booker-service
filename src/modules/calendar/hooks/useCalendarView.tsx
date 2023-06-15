import { getLSItem, saveLSItem } from "common/utils/webStorage";
import { useEffect, useState } from "react";
import { View } from "react-big-calendar";
import { useQuery } from "@tanstack/react-query";

import {
  getEndOfTheMonth,
  getStartOfTheMonth,
} from "../utils/calendarViewUtils";
import { CalendarLSUi } from "../types";
import { useAuth } from "modules/auth/contexts";
import { getCalendarVisits } from "modules/visits/api";
import { lsNames } from "common/constants/webStorageItems";

const useCalendarView = (checkedEmployees: string[]) => {
  const { user } = useAuth();

  const calendarLSUi = getLSItem<CalendarLSUi>(lsNames.calendar.ui);
  const [view, setView] = useState<View>(calendarLSUi?.view || "month");

  const [dateRange, setDateRange] = useState<[Date, Date]>(
    calendarLSUi?.dateRange
      ? [
          new Date(calendarLSUi.dateRange[0]),
          new Date(calendarLSUi.dateRange[1]),
        ]
      : [getStartOfTheMonth(), getEndOfTheMonth()]
  );

  useEffect(() => {
    saveLSItem(lsNames.calendar.ui, {
      view,
      dateRange: [dateRange[0].toISOString(), dateRange[1].toISOString()],
    } as CalendarLSUi);
  }, [dateRange, view]);

  const { data: visits, refetch: refetchVisits } = useQuery(
    ["calendar-visits", user?.id, dateRange, checkedEmployees],
    () => getCalendarVisits(user?.id || "", dateRange, checkedEmployees),
    { enabled: !!user, keepPreviousData: true }
  );

  const changeView = (view: View) => {
    setView(view);
  };

  const changeDateRange = (dateRange: [Date, Date]) => {
    setDateRange(dateRange);
  };

  return {
    changeView,
    dateRange,
    changeDateRange,
    view,
    visits,
    refetchVisits,
  };
};

export default useCalendarView;
