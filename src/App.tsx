import AppProviders from "common/providers/AppProviders";
import { Router } from "routes";

const App = () => {
  return (
    <AppProviders>
      <Router />
    </AppProviders>
  );
};

export default App;
