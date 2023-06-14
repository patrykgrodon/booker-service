import { getSSItem, saveSSItem } from "common/utils/webStorage";
import { useEffect, useState } from "react";
import { View } from "react-big-calendar";
import {
  getEndOfTheMonth,
  getStartOfTheMonth,
} from "../utils/calendarViewUtils";
import { CalendarSSUi } from "../types";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "modules/auth/contexts";
import { getCalendarVisits } from "modules/visits/api";

const useCalendarView = () => {
  const { user } = useAuth();

  const ssItemName = "calendar-ui";
  const calendarSSUi = getSSItem(ssItemName) as CalendarSSUi | undefined;
  const [view, setView] = useState<View>(calendarSSUi?.view || "month");

  const [dateRange, setDateRange] = useState<[Date, Date]>(
    calendarSSUi?.dateRange
      ? [
          new Date(calendarSSUi.dateRange[0]),
          new Date(calendarSSUi.dateRange[1]),
        ]
      : [getStartOfTheMonth(), getEndOfTheMonth()]
  );

  useEffect(() => {
    saveSSItem(ssItemName, {
      view,
      dateRange: [dateRange[0].toISOString(), dateRange[1].toISOString()],
    } as CalendarSSUi);
  }, [dateRange, view]);

  const { data: visits, refetch: refetchVisits } = useQuery(
    ["calendar-visits", user?.id, dateRange],
    () => getCalendarVisits(user?.id || "", dateRange),
    { enabled: !!user }
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
