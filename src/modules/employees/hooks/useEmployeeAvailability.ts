import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "common/utils/queryKeys";
import { checkIfEmployeeIsAvailable } from "../api";
import { Service } from "modules/services/types";
import { addServiceDurationToStartDate } from "modules/visits/utils/addServiceDurationToStartDate";
import { getServiceDuration } from "modules/visits/components/VisitForm";

const useEmployeeAvailability = (
  employeeId: string,
  date: Date,
  service: string,
  services: Service[]
) => {
  const dateRange = [
    date,
    addServiceDurationToStartDate(date, getServiceDuration(service, services)),
  ] as [Date, Date];

  return useQuery(
    queryKeys.employeeAvailability(employeeId, dateRange),
    () => checkIfEmployeeIsAvailable(employeeId, dateRange),
    {
      enabled: !!employeeId && !!service,
    }
  );
};

export default useEmployeeAvailability;
