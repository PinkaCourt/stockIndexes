import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducers";
import sagas from "./sagas";

const initialState = {};
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  devTools: true,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(sagas);

export type RootState = ReturnType<typeof store.getState>;

export default store;
