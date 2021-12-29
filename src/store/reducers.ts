import { combineReducers } from "redux";

import userDataReducer from "containers/UserData/reducer";
import exchangeRatesReducer from "containers/exchangeRates/reducer";
import tinkoffReducer from "containers/Tinkoff/reducer";
import moexReducer from "containers/Moex/reducer";
import sp500Reducer from "containers/SP500/reducer";
import daxReducer from "containers/DAX40/reducer";

const rootReducer = combineReducers({
  userData: userDataReducer,
  exchangeRates: exchangeRatesReducer,
  tinkoff: tinkoffReducer,
  moex: moexReducer,
  sp500: sp500Reducer,
  dax: daxReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
