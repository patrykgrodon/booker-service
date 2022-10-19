import { makeStyles } from "common/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  container: {
    background: "transparent",
    color: theme.palette.primary.dark,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    "&:hover": {
      background: theme.palette.primary.dark,
      color: "#fff",
    },
  },
  spinner: {
    color: theme.palette.primary.dark,
  },
  tooltip: {
    marginRight: theme.spacing(1),
  },
  colorInfo: {
    backgroundColor: theme.palette.error.main,
  },
}));

export default useStyles;
