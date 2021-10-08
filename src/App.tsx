import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";

import store from "store/store";
import Moex from "components/Moex";
import SP500 from "components/SP500";
import TinkoffTable from "components/Tinkoff";
import Total from "components/Total";

import "./App.css";

export const routes = {
  total: {
    path: "/",
    exact: true,
    component: Total,
  },
  tinkoff: {
    path: "/tinkoff",
    exact: false,
    component: TinkoffTable,
  },
  moex: {
    path: "/moex",
    exact: false,
    component: Moex,
  },
  sp500: {
    path: "/sp500",
    exact: false,
    component: SP500,
  },
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppBar position="static">
          <Tabs centered>
            <Tab component="a" label="All exchanges" href="/" />
            <Tab component="a" label="Tinkoff" href="/tinkoff" />
            <Tab component="a" label="Moex" href="/moex" />
            <Tab component="a" label="S&P500" href="/sp500" />
          </Tabs>
        </AppBar>

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
      </Router>
    </Provider>
  );
}

export default App;
