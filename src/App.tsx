import { Switch, Route, Redirect } from 'react-router-dom';

import MarketList from 'components/MarketList';
import CoinDetails from 'components/CoinDetails';
import { useScrollToTop } from 'hooks/useScrollToTop';
import * as RoutePaths from 'constants/RoutePaths';

import classes from './App.module.scss';

function App() {
  useScrollToTop();

  return (
    <div className={classes.component}>
      <header>
        <h1 className={classes.title}>Coins</h1>
      </header>

      <main>
        <Switch>
          <Route path={RoutePaths.MARKETS}>
            <MarketList />
          </Route>
          <Route path={RoutePaths.COIN}>
            <CoinDetails />
          </Route>
          <Redirect from={RoutePaths.ALL} to={RoutePaths.MARKETS} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
