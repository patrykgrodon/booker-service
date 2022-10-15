import { useAuth } from "modules/auth/contexts/authContext";

const Dashboard = () => {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <div>
      Witaj, {user.firstName} {user.lastName}
    </div>
  );
};

export default Dashboard;
