import { Grid, Typography } from "@mui/material";
import { db } from "firebase-config";
import { useAuth } from "modules/auth/contexts/authContext";
import { useQuery } from "react-query";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { parseGetDocs } from "utils/parseGetDocs";
import { Visit, VisitWithTimeStamp } from "common/providers/VisitsProvider";
import CustomerVisit from "./CustomerVisit/CustomerVisit";
import { Spinner } from "common/components";

const CustomerVisits = () => {
  const { user } = useAuth();

  const getCustomerVisits = async (userId: string) => {
    const visitsCollectionRef = collection(db, "visits");
    const q = query(
      visitsCollectionRef,
      where("customerId", "==", userId),
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

  if (isLoading) return <Spinner size="medium" />;

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
          You have {customerVisits?.length || ""} upcoming visits.
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
