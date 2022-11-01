import { makeStyles } from "common/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  main: {
    width: "100%",
    margin: 0,
    display: "flex",
    justifyContent: "space-between",
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(0, 4),
  },
  icon: {
    marginRight: theme.spacing(2),
    marginBottom: "0 !important",
  },
  tab: {
    marginRight: theme.spacing(3),
    minHeight: "55px",
    flexDirection: "row",
  },
  downloadButton: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "inline-flex",
    },
  },
  indicator: {
    backgroundColor: theme.palette.primary.dark,
  },
  selected: {
    color: `${theme.palette.primary.dark} !important`,
  },
}));

export default useStyles;
