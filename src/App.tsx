import { AppProviders } from "common/providers";
import { Router } from "routes";

function App() {
  return (
    <AppProviders>
      <Router />
    </AppProviders>
  );
}

export default App;
