import { combineReducers } from "redux";

import userDataReducer from "containers/UserData/reducer";
import exchangeRatesReducer from "containers/exchangeRates/reducer";
import tinkoffReducer from "containers/Tinkoff/reducer";
import moexReducer from "containers/Moex/reducer";

const rootReducer = combineReducers({
  userData: userDataReducer,
  exchangeRates: exchangeRatesReducer,
  tinkoff: tinkoffReducer,
  moex: moexReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
