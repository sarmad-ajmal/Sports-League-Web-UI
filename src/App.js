import { useEffect, } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NotFound } from "./common/components";
import Leaderboard from "./components/leaderboard";

import Schedules from "./components/schedules";
import { LeagueServiceContext } from "./contexts";
import { DefaultLayout } from "./layouts";
import { ROUTES } from "./routes";
import LeagueService from "./services/LeagueService";

import "./styles/index.scss";

function App() {
  const league = new LeagueService();
  useEffect(() => {
    league.fetchData();
    league.getLeaderboard();
  }, []);
  return (
    <LeagueServiceContext.Provider value={{ league }}>
      <Router>
        <Switch>
          <Route
            path={ROUTES.leaderboard}
            component={() => (
              <DefaultLayout>
                <Leaderboard />
              </DefaultLayout>
            )}
          />
          <Route
            path={ROUTES.home}
            component={() => (
              <DefaultLayout>
                <Schedules />
              </DefaultLayout>
            )}
          />
          <Route
            path="*"
            component={() => (
              <DefaultLayout>
                <NotFound />
              </DefaultLayout>
            )}
          />
        </Switch>
      </Router>
    </LeagueServiceContext.Provider>
  );
}

export default App;
