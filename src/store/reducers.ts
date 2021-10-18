import { combineReducers } from "redux";

import tinkoffReducer from "containers/Tinkoff/reducer";
import moexReducer from "containers/Moex/reducer";

const rootReducer = combineReducers({
  tinkoff: tinkoffReducer,
  moex: moexReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
