import {
  Box,
  CircularProgress,
  CircularProgressProps,
  Paper,
} from "@mui/material";

type Size = "small" | "medium" | "large" | number;

const getSpinnerSize = (size: Size) => {
  const SMALL_SIZE = 22;
  const MEDIUM_SIZE = 38;
  const LARGE_SIZE = 62;

  switch (size) {
    case "small":
      return SMALL_SIZE;
    case "medium":
      return MEDIUM_SIZE;
    case "large":
      return LARGE_SIZE;
    default:
      return size;
  }
};

type Props = CircularProgressProps & {
  size: Size;
  fullPage?: boolean;
  button?: boolean;
};

const Spinner = ({
  size,
  button = false,
  fullPage = false,
  ...props
}: Props) => {
  const Progress = () =>
    button ? (
      <CircularProgress size={getSpinnerSize(size)} {...props} />
    ) : (
      <Box
        sx={{
          p: (theme) => theme.spacing(4, 2),
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <CircularProgress size={getSpinnerSize(size)} {...props} />
      </Box>
    );

  if (fullPage) {
    return (
      <Paper
        sx={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10000,
        }}
      >
        <Progress />
      </Paper>
    );
  }

  return <Progress />;
};
export default Spinner;
