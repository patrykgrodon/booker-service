import { getUserSettings } from "common/api";
import { useToast } from "common/providers/ToastProvider";
import { useVisits, Visit } from "common/providers/VisitsProvider";
import { addDays, startOfDay } from "date-fns";
import { useAuth } from "modules/auth/contexts/authContext";
import { getServiceProviderVisits } from "modules/dashboard/api";
import { createAvailableHours } from "modules/services/utils";
import { useState } from "react";
import { useQuery } from "react-query";
import { Service } from "../types";

const useBookService = (service: Service, handleClose: () => void) => {
  const { user } = useAuth();
  const { addVisit } = useVisits();
  const [isLoading, setIsLoading] = useState(false);
  const [visitDate, setVisitDate] = useState<null | Date>(null);
  const [currentDay, setCurrentDay] = useState(startOfDay(new Date()));
  const [availableHours, setAvailableHours] = useState<
    { asDate: Date; asString: string }[]
  >([]);

  const { setSuccessMessage, setErrorMessage } = useToast();

  const changeCurrentDay = (date: Date) => {
    setCurrentDay(date);
  };

  const { data: companySettings, isLoading: isFetching } = useQuery(
    [`user-settings-${service.userId}`],
    async () => getUserSettings(service.userId)
  );

  const { data: currentDayVisits } = useQuery(
    [`visits-${service.userId}`, currentDay, service.userId],
    async () => {
      if (!companySettings) return undefined;
      const { openingHours } = companySettings;
      const visits = await getServiceProviderVisits(
        service.userId,
        currentDay,
        addDays(currentDay, 1)
      );
      const availableHours = createAvailableHours(
        openingHours,
        service.duration,
        currentDay
      );
      setAvailableHours(availableHours);

      return visits;
    },
    { enabled: !!companySettings }
  );

  const changeVisitDate = (date: Date) => setVisitDate(date);

  const handleBookVisit = async () => {
    if (!user || user.type === "serviceProvider" || !visitDate) return;
    setIsLoading(true);
    try {
      const { type, ...restUserInfo } = user;
      const visit: Omit<Visit, "id"> = {
        service,
        date: visitDate,
        customer: restUserInfo,
      };
      await addVisit(visit);
      handleClose();
      setSuccessMessage("Successfully booked a visit");
    } catch (err: any) {
      setErrorMessage("Unable to book a visit. Try again!");
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    handleBookVisit,
    isFetching,
    companySettings,
    visitDate,
    changeVisitDate,
    currentDay,
    changeCurrentDay,
    availableHours,
    currentDayVisits,
  };
};

export default useBookService;
