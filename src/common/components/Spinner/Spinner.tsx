import {
  Box,
  CircularProgress,
  CircularProgressProps,
  Grid,
} from "@mui/material";

type Size = "small" | "medium" | "large" | number;

type Props = CircularProgressProps & {
  size: Size;
  fullPage?: boolean;
  button?: boolean;
};

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
      <Grid
        container
        sx={{
          padding: (theme) => theme.spacing(4, 2),
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "320px",
          textAlign: "center",
          margin: "1rem auto 2rem auto",
        }}>
        <CircularProgress size={getSpinnerSize(size)} {...props} />
      </Grid>
    );

  if (fullPage) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          background: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10000,
        }}>
        <Progress />
      </Box>
    );
  }

  return <Progress />;
};
export default Spinner;
