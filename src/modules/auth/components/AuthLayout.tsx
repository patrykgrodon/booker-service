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
        flexDirection: "column",
        mx: { xs: 2, md: 6, lg: 15 },
      }}
    >
      <Box sx={{ height: "64px", display: "flex", alignItems: "center" }}>
        <Logo />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          flex: 1,
          justifyContent: { xs: "center", lg: "space-evenly" },
          alignItems: "center",
          columnGap: 12,
        }}
      >
        <Box
          component="img"
          src={barberIllustration}
          alt="Barber Illustration"
          sx={{
            display: { xs: "none", sm: "block" },
            opacity: 0.7,
            width: { xs: 300, lg: 600 },
            height: { xs: 300, lg: 600 },
            aspectRatio: "138/100",
            flexShrink: 1,
          }}
        />
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;
