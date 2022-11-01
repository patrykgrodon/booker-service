import { Grid, Card, Typography } from "@mui/material";
import { RequestButton } from "common/components";
import { Visit } from "common/providers/VisitsProvider";
import { format } from "date-fns";
import { useState } from "react";
import { dashedDateTimeFormatNoSeconds } from "utils/dateTimeUtils";
import { getDoc, doc } from "@firebase/firestore";
import { db } from "firebase-config";
import { parseGetDoc } from "utils/parseGetDocs";
import { User } from "common/types";
import { getVisitDurationText } from "utils/getVisitDurationText";

interface CustomerVisitProps {
  visit: Visit;
}

const CustomerVisit = ({ visit }: CustomerVisitProps) => {
  const { date, service } = visit;
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<null | string>(null);

  const fields = [
    { label: "Service name", value: service.name },
    { label: "Provider", value: service.companyName },
    { label: "Date", value: format(date, dashedDateTimeFormatNoSeconds) },
    { label: "City", value: service.city },
    { label: "Cost", value: `${service.cost} euro` },
    { label: "Duration", value: getVisitDurationText(service.duration) },
  ];

  const fetchPhoneNumber = async () => {
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
    <Grid item xs={12} md={6} lg={4}>
      <Card sx={{ padding: (theme) => theme.spacing(2) }}>
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
                onClick={fetchPhoneNumber}
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
