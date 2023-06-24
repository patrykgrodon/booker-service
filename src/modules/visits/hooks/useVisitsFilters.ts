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
  const [visitsFilters, setVisitsFilters] = useState<VisitsFilters>({
    employees: {},
  });

  const changeFilters: ChangeVisitsFilters = (filter, id, checked) => {
    setVisitsFilters((prev) => {
      const copyPrev = { ...prev };

      copyPrev[filter][id] = checked;

      return copyPrev;
    });
  };

  return { visitsFilters, changeFilters };
};

export default useVisitsFilters;
