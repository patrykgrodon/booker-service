import { Box, Typography, IconButton } from "@mui/material";

import { OpeningHoursDialog, SettingsCard } from "../components";
import { EditOutlined } from "@mui/icons-material";
import days from "../constants/days";
import { useModal } from "common/hooks";
import useSettings from "../hooks/useSettings";
import { Spinner } from "common/components";

const OpeningHours = () => {
  const { closeModal, isOpen, openModal } = useModal();

  const { settings, isLoading, isError, refetch } = useSettings();

  if (isLoading) return <Spinner size="medium" />;
  if (isError || !settings)
    return (
      <Typography variant="subtitle1" color="error" align="center">
        Something went wrong... <br /> Refresh page or contact with support
      </Typography>
    );

  const { openingHours } = settings;

  const openingHoursWithDay = days.map((day) => ({
    ...openingHours[day],
    day,
  }));

  return (
    <SettingsCard
      title="Opening hours"
      button={
        <IconButton size="small" color="primary" onClick={openModal}>
          <EditOutlined fontSize="small" />
        </IconButton>
      }
    >
      {openingHoursWithDay.map(({ day, to, open, from }) => (
        <Box
          key={day}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography sx={{ textTransform: "capitalize" }}>{day}</Typography>
          <Typography>
            {open
              ? `${from.hour}:${from.minute} - ${to.hour}:${to.minute}`
              : "Closed"}
          </Typography>
        </Box>
      ))}

      {isOpen ? (
        <OpeningHoursDialog
          handleClose={closeModal}
          isOpen={isOpen}
          openingHours={openingHours}
          refetch={refetch}
        />
      ) : null}
    </SettingsCard>
  );
};

export default OpeningHours;
