import { Box, Grid, Typography } from "@mui/material";
import { db } from "firebase-config";
import { useAuth } from "modules/auth/contexts/authContext";
import { useQuery } from "react-query";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { parseGetDocs } from "utils/parseGetDocs";
import { Visit, VisitWithTimeStamp } from "common/providers/VisitsProvider";
import CustomerVisit from "./CustomerVisit/CustomerVisit";
import { Spinner } from "common/components";

const LoadingSpinner = (
  <Box sx={{ flex: 1 }}>
    <Spinner size="medium" />
  </Box>
);

const CustomerVisits = () => {
  const { user } = useAuth();

  const getCustomerVisits = async (userId: string) => {
    const visitsCollectionRef = collection(db, "visits");
    const q = query(
      visitsCollectionRef,
      where("customer.id", "==", userId),
      where("date", ">", new Date())
    );
    const data = await getDocs(q);
    const visitsWithTimeStamp = parseGetDocs<VisitWithTimeStamp[]>(data);
    const visits: Visit[] = visitsWithTimeStamp.map((visit) => {
      return { ...visit, date: visit.date.toDate() };
    });
    return visits;
  };

  const { data: customerVisits, isLoading } = useQuery(
    [`customer-visits-${user?.id || ""}`],
    () => {
      if (!user) return undefined;
      return getCustomerVisits(user.id);
    }
  );

  if (isLoading)
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}>
        {LoadingSpinner}
      </Box>
    );

  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginTop: (theme) => theme.spacing(3),
        maxWidth: "100%",
      }}>
      <Grid item xs={12}>
        <Typography variant="h3">
          {customerVisits
            ? `You have ${customerVisits.length} upcoming visits.`
            : "You don't have upcoming visits."}
        </Typography>
      </Grid>

      {customerVisits
        ?.sort((a, b) => a.date.getTime() - b.date.getTime())
        .map((visit) => (
          <CustomerVisit key={visit.id} visit={visit} />
        ))}
    </Grid>
  );
};

export default CustomerVisits;
