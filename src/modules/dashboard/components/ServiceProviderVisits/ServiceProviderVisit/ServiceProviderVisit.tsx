import { Card, Grid, Typography } from "@mui/material";
import { RequestButton } from "common/components";
import { Visit } from "common/providers/VisitsProvider";
import { format } from "date-fns";
import { useState } from "react";
import { dashedDateTimeFormatNoSeconds } from "utils/dateTimeUtils";
import { getVisitDurationText } from "utils/getVisitDurationText";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "firebase-config";
import { parseGetDoc } from "utils/parseGetDocs";
import { User } from "common/types";

interface ServiceProviderVisitProps {
  visit: Visit;
}

const ServiceProviderVisit = ({ visit }: ServiceProviderVisitProps) => {
  const { service, date, customerId } = visit;
  const [isLoading, setIsLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<
    { label: string; value: string }[] | null
  >(null);

  const fields = [
    { label: "Service name", value: service.name },
    { label: "Date", value: format(date, dashedDateTimeFormatNoSeconds) },
    { label: "Cost", value: `${service.cost} euro` },
    { label: "Duration", value: getVisitDurationText(service.duration) },
  ];

  const fetchCustomerInfo = async () => {
    setIsLoading(true);
    try {
      const docRef = doc(db, "users", customerId);
      const data = await getDoc(docRef);
      const customer = parseGetDoc<User>(data);
      if (customer.type === "customer") {
        const customerInfo = [
          { label: "First name", value: customer.firstName },
          { label: "Last name", value: customer.lastName },
          { label: "Phone number", value: customer.phoneNumber },
        ];
        setCustomerInfo(customerInfo);
      }
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
          {customerInfo ? (
            customerInfo.map(({ label, value }) => (
              <Grid key={label} item xs={12} md={6}>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ fontWeight: 500 }}>
                  {label}
                </Typography>
                <Typography variant="subtitle1">{value}</Typography>
              </Grid>
            ))
          ) : (
            <Grid item xs={12} md={6}>
              <RequestButton
                isLoading={isLoading}
                onClick={fetchCustomerInfo}
                variant="text">
                Show customer info
              </RequestButton>
            </Grid>
          )}
        </Grid>
      </Card>
    </Grid>
  );
};

export default ServiceProviderVisit;
