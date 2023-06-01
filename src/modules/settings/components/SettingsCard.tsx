import { Box, Card, Divider, Typography } from "@mui/material";

type SettingsCardProps = {
  title: string;
  children: React.ReactNode;
  button?: React.ReactNode;
};

const SettingsCard = ({ title, children, button }: SettingsCardProps) => {
  return (
    <Card>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          p: 1.5,
          pb: 1,
        }}
      >
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        {button}
      </Box>
      <Divider />
      <Box component="main" sx={{ p: 1.5 }}>
        {children}
      </Box>
    </Card>
  );
};

export default SettingsCard;
