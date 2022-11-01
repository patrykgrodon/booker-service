import { makeStyles } from "common/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  text: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  listItem: {
    color: theme.palette.primary.dark,
    borderRadius: theme.shape.borderRadius,
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    "&:hover *": {
      color: theme.palette.secondary.main,
    },
    "&:hover span": {
      color: theme.palette.common.white,
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
  },
  activeListItem: {
    backgroundColor: theme.palette.primary.dark,
    "& *": {
      color: theme.palette.secondary.main,
    },
    "& span": {
      color: theme.palette.common.white,
    },
  },
  listItemIcon: {
    minWidth: "40px",
    color: theme.palette.primary.dark,
  },
}));
export default useStyles;
