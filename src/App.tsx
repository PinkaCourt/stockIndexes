import React from "react";
import "./App.css";
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "store/store";

import TinkoffTable from "components/Tinkoff";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <TinkoffTable />
    </Provider>
  );
}

export default App;
