import { UnknownObject } from "common/types/UnknownObject";

export const filterTruthyObjectValues = <T>(obj: UnknownObject<T>) =>
  Object.values(obj).filter((value) => value);
