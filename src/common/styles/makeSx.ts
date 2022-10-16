import { Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

export const makeSx = (initFn: (theme: Theme) => SystemStyleObject<Theme>) =>
  initFn;
