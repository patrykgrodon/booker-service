import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import NoUserDataForm from "./NoUserDataForm";

type NoUserDartaProps = {
  email: string;
  userId: string;
};

const NoUserData = ({ email, userId }: NoUserDartaProps) => {
  return (
    <Dialog open>
      <DialogTitle sx={{ pb: 0 }}>Complete the data</DialogTitle>
      <DialogContent>
        <NoUserDataForm email={email} userId={userId} />
      </DialogContent>
    </Dialog>
  );
};

export default NoUserData;
