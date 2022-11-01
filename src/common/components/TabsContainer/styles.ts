import { makeStyles } from "common/styles/makeStyles";

const useTabsContainerStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: 0,
    maxWidth: "100% !important",
    height: "100%",
    maxHeight: "100%",
  },
  contentContainer: {
    maxWidth: "100% !important",
    padding: theme.spacing(2),
    height: "calc(100% - 57px)",
    maxHeight: "calc(100% - 57px)",
    overflow: "auto",
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4),
    },
    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(6),
    },
  },
}));

export default useTabsContainerStyles;
