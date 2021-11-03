import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "store/store";
import Moex from "components/Moex";
import SP500 from "components/SP500";
import TinkoffTable from "components/Tinkoff";
import UserDataDialog from "components/UserDataDialog";

import AppBarMui from "components/AppBarMui";

import "./App.css";

export const routes = {
  tinkoff: {
    path: "/tinkoff",
    exact: false,
    label: "Tinkoff",
    component: TinkoffTable,
  },
  moex: {
    path: "/moex",
    exact: false,
    label: "Moex",
    component: Moex,
  },
  sp500: {
    path: "/sp500",
    exact: false,
    label: "S&P500",
    component: SP500,
  },
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <UserDataDialog />
        <Route path="/">
          <AppBarMui tabs={routes} />
        </Route>
        <Switch>
          {Object.values(routes).map((route) => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
