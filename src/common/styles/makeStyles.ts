import { css as emotionCss } from "@emotion/css";
import { Theme } from "@mui/material";
import { css } from "@mui/material/styles";
import { SystemStyleObject } from "@mui/system";
import theme from "./theme";

const makeClasses = <T extends Record<string, SystemStyleObject<Theme>>>(
  obj: T
) => {
  // @ts-ignore
  let classes: Record<keyof T, string> = {};

  Object.keys(obj).forEach((key: keyof T) => {
    const cls = css(obj[key] as any);
    const className = emotionCss(cls.styles);

    classes[key] = className;
  });

  return classes;
};

export const makeStyles = <T extends string>(
  initFn: (theme: Theme) => Record<T, SystemStyleObject<Theme>>
) => {
  return () => makeClasses(initFn(theme));
};
