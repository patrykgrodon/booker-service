import { Grid, Card, Typography } from "@mui/material";
import { RequestButton } from "common/components";
import { Visit } from "common/providers/VisitsProvider";
import { makeSx } from "common/styles/makeSx";
import { format } from "date-fns";
import { useState } from "react";
import { dashedDateTimeFormatNoSeconds } from "utils/dateTimeUtils";
import { getDoc, doc } from "@firebase/firestore";
import { db } from "firebase-config";
import { parseGetDoc } from "utils/parseGetDocs";
import { User } from "common/types";

interface CustomerVisitProps {
  visit: Visit;
}

const sxCard = makeSx((theme) => ({
  padding: theme.spacing(2),
}));

const CustomerVisit = ({ visit }: CustomerVisitProps) => {
  const { id, date, service } = visit;
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<null | string>(null);

  const getDuration = () => {
    const [h, m] = service.duration.split(":");
    const hours = +h;
    const minutes = +m;

    const hoursText = hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""}` : "";
    const minutesText =
      minutes > 0 ? `${minutes} minute${minutes > 1 ? "s" : ""}` : "";

    return `${hoursText} ${minutesText}`;
  };

  const fields = [
    { label: "Service name", value: service.name },
    { label: "Provider", value: service.companyName },
    { label: "Date", value: format(date, dashedDateTimeFormatNoSeconds) },
    { label: "City", value: service.city },
    { label: "Cost", value: `${service.cost} euro` },
    { label: "Duration", value: getDuration() },
  ];

  const getPhoneNumber = async () => {
    setIsLoading(true);
    try {
      const docRef = doc(db, "users", service.userId);
      const data = await getDoc(docRef);
      const serviceProvider = parseGetDoc<User>(data);
      setPhoneNumber(serviceProvider.phoneNumber);
    } catch (err: any) {}
    setIsLoading(false);
  };

  return (
    <Grid key={id} item xs={12} md={6} lg={4}>
      <Card sx={sxCard}>
        <Grid container spacing={1}>
          {fields.map(({ label, value }) => (
            <Grid key={label} item xs={12} md={6}>
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ fontWeight: 500 }}>
                {label}
              </Typography>
              <Typography variant="subtitle1">{value}</Typography>
            </Grid>
          ))}
          <Grid item xs={12} md={6}>
            {phoneNumber ? (
              <>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ fontWeight: 500 }}>
                  Phone number
                </Typography>
                <Typography variant="subtitle1">{phoneNumber}</Typography>
              </>
            ) : (
              <RequestButton
                isLoading={isLoading}
                onClick={getPhoneNumber}
                variant="text">
                Show number
              </RequestButton>
            )}
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default CustomerVisit;
