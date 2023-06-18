import { Box, Typography } from "@mui/material";

type PageContainerProps = {
  children: React.ReactNode;
  title: string;
  button?: React.ReactNode;
};

const PageContainer = ({ children, title, button }: PageContainerProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h3" component="h1" sx={{ lineHeight: 1 }}>
          {title}
        </Typography>
        {button}
      </Box>
      {children}
    </Box>
  );
};

export default PageContainer;
