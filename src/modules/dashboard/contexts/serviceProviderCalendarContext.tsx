import { createContext, useContext, useEffect, useState } from "react";
import { DatesSetArg } from "@fullcalendar/react";
import { Visit } from "common/providers/VisitsProvider";
import { useAuth } from "modules/auth/contexts/authContext";
import { useQuery } from "react-query";
import { getServiceProviderVisits } from "../api";
import { createStartEndVisitDates } from "modules/services/utils";

interface ServiceCalendarContextState {
  events: any[];
  isLoading: boolean;
  handleDatesSet: (dates: DatesSetArg) => void;
  serviceProviderVisits: Visit[] | undefined;
  dateRange: null | {
    start: Date;
    end: Date;
  };
}

const ServiceCalendarContext =
  createContext<ServiceCalendarContextState | null>(null);

interface ServiceCalendarContextProviderProps {
  children: React.ReactNode;
}

const ServiceCalendarContextProvider = ({
  children,
}: ServiceCalendarContextProviderProps) => {
  const { user } = useAuth();
  const [dateRange, setDateRange] = useState<null | {
    start: Date;
    end: Date;
  }>(null);

  const { data: serviceProviderVisits, isLoading } = useQuery(
    [`service-provider-visits-${user?.id || ""}`, dateRange],
    () => {
      if (!user || !dateRange) return undefined;
      return getServiceProviderVisits(user.id, dateRange.start, dateRange.end);
    },
    { keepPreviousData: true }
  );
  const [events, setEvents] = useState<any>([]);

  useEffect(() => {
    const events =
      serviceProviderVisits?.map(({ date, service, id, customer }) => {
        const { duration, name } = service;

        const { start, end } = createStartEndVisitDates(date, duration);
        return {
          id,
          title: name,
          start,
          end,
          extendedProps: customer,
        };
      }) || [];

    setEvents(events);
  }, [serviceProviderVisits]);

  const handleDatesSet = (dates: DatesSetArg) => {
    const { start, end } = dates;
    if (JSON.stringify(dateRange) === JSON.stringify({ start, end })) return;
    setDateRange({ start, end });
  };
  return (
    <ServiceCalendarContext.Provider
      value={{
        isLoading,
        events,
        handleDatesSet,
        serviceProviderVisits,
        dateRange,
      }}>
      {children}
    </ServiceCalendarContext.Provider>
  );
};

const useServiceCalendar = () => {
  const context = useContext(ServiceCalendarContext);
  if (!context) {
    throw new Error("ServiceCalendarContext must be used within provider");
  }
  return context;
};

export { useServiceCalendar };
export default ServiceCalendarContextProvider;
