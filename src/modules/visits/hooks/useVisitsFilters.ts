import { ssNames } from "common/constants/webStorageItems";
import { getSSItem, saveSSItem } from "common/utils/webStorage";
import { useState } from "react";

export type VisitsFilters = {
  employees: {
    [key: string]: boolean;
  };
};

export type ChangeVisitsFilters = (
  filter: keyof VisitsFilters,
  id: string,
  checked: boolean
) => void;

const useVisitsFilters = () => {
  const visitsFiltersSS = getSSItem<VisitsFilters>(ssNames.visits.filters);
  const [visitsFilters, setVisitsFilters] = useState<VisitsFilters>(
    visitsFiltersSS || {
      employees: {},
    }
  );

  const changeFilters: ChangeVisitsFilters = (filter, id, checked) => {
    setVisitsFilters((prev) => {
      const copyPrev = { ...prev };
      copyPrev[filter][id] = checked;
      saveSSItem(ssNames.visits.filters, copyPrev);
      return copyPrev;
    });
  };

  return { visitsFilters, changeFilters };
};

export default useVisitsFilters;
