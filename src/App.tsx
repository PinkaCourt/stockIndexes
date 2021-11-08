import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";

import Moex from "components/Moex";
import SP500 from "components/SP500";
import TinkoffTable from "components/Tinkoff";
import UserDataDialog from "components/UserDataDialog";
import AppBarMui from "components/AppBarMui";
import { selectTinkoffToken } from "containers/UserData/selectors";
import { themeDF, themeTF, themeMOEX, themeSP500 } from "themes";
import "./App.css";

export const routes = {
  tinkoff: {
    path: "/",
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

const App = () => {
  const tinkoffToken = useSelector(selectTinkoffToken);
  const location = useLocation();

  const [openDialog, setOpenDialog] = React.useState(!Boolean(tinkoffToken));

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const themeUsed = React.useMemo(() => {
    const { pathname } = location;

    switch (pathname) {
      case routes.tinkoff.path:
        return themeTF;
      case routes.moex.path:
        return themeMOEX;
      case routes.sp500.path:
        return themeSP500;
      default:
        return themeDF;
    }
  }, [location]);

  return (
    <ThemeProvider theme={themeUsed}>
      <UserDataDialog open={openDialog} handleCloseDialog={handleCloseDialog} />
      <AppBarMui tabs={routes} handleOpenDialog={handleOpenDialog} />
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
    </ThemeProvider>
  );
};

export default App;
