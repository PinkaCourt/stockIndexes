import { combineReducers } from "redux";

import tinkoffReducer from "containers/Tinkoff/reducer";

const rootReducer = combineReducers({
  tinkoff: tinkoffReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
