import { useAuth } from "modules/auth/contexts/authContext";
import { db } from "firebase-config";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { parseGetDocs } from "utils/parseGetDocs";
import { Visit, VisitWithTimeStamp } from "common/providers/VisitsProvider";
import { useQuery } from "react-query";
import { Grid, Typography } from "@mui/material";
import ServiceProviderVisit from "./ServiceProviderVisit/ServiceProviderVisit";

interface ServiceProviderVisitsProps {
  LoadingSpinner: JSX.Element;
}

const ServiceProviderVisits = ({
  LoadingSpinner,
}: ServiceProviderVisitsProps) => {
  const { user } = useAuth();
  const getServiceProviderVisits = async (userId: string) => {
    const visitsCollectionRef = collection(db, "visits");
    const q = query(
      visitsCollectionRef,
      where("service.userId", "==", userId),
      where("date", ">", new Date())
    );
    const data = await getDocs(q);
    const visitsWithTimeStamp = parseGetDocs<VisitWithTimeStamp[]>(data);
    const visits: Visit[] = visitsWithTimeStamp.map((visit) => {
      return { ...visit, date: visit.date.toDate() };
    });
    return visits;
  };

  const { data: serviceProviderVisits, isLoading } = useQuery(
    [`service-provider-visits-${user?.id || ""}`],
    () => {
      if (!user) return undefined;
      return getServiceProviderVisits(user.id);
    }
  );

  if (isLoading) return LoadingSpinner;
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
          {serviceProviderVisits
            ? `You have ${serviceProviderVisits.length} upcoming visits.`
            : "You don't have upcoming visits."}
        </Typography>
      </Grid>

      {serviceProviderVisits
        ?.sort((a, b) => a.date.getTime() - b.date.getTime())
        .map((visit) => (
          <ServiceProviderVisit key={visit.id} visit={visit} />
        ))}
    </Grid>
  );
};

export default ServiceProviderVisits;
