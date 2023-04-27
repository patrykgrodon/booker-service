import { Box } from "@mui/material";

import { barberIllustration } from "assets";
import { Logo } from "common/components";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        overflow: "auto",
        flexDirection: "column",
        px: { xs: 2, md: 6, lg: 15 },
      }}
    >
      <Box
        sx={{
          height: "64px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Logo />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: { xs: "center", lg: "space-evenly" },
          alignItems: "center",
          columnGap: 12,
          rowGap: 6,
          py: 2,
        }}
      >
        <Box
          sx={{
            flex: { xs: 0, lg: 1 },
            flexShrink: { xs: 1, sm: 0 },
            display: { xs: "none", sm: "flex" },
            justifyContent: "center",
            height: { xs: "max-content" },
          }}
        >
          <Box
            component="img"
            src={barberIllustration}
            alt="Barber Illustration"
            sx={{
              opacity: 0.7,
              width: { xs: "50%", lg: "100%" },
              height: "max-content",
            }}
          />
        </Box>
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;
