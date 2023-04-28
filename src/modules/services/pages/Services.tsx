import { Box, Typography, Button } from "@mui/material";
import { ServiceFormDialog, ServicesTable } from "../components";
import { useModal } from "common/hooks";

const Services = () => {
  const { isOpen, closeModal, openModal } = useModal();
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" component="h1" sx={{ lineHeight: 1, mb: 4 }}>
          My services
        </Typography>
        <Button color="success" onClick={openModal}>
          Add service
        </Button>
      </Box>
      <ServicesTable />
      <ServiceFormDialog
        handleClose={closeModal}
        isOpen={isOpen}
        onSuccess={closeModal}
      />
    </Box>
  );
};

export default Services;
