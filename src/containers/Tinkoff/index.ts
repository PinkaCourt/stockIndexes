import { useMemo } from "react";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";

//import Tinkoff from "./Tinkoff";
//import { selectTinkoffState } from "./selectors";
import { A, B } from "./actions";

//import tinkoffReducer  from "./reducer";
import tinkoffSaga from "./sagas";

//export const useTinkoffState = () => useSelector(selectTinkoffState);

export const useTinkoffActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators({ A, B }, dispatch), [dispatch]);
};

/*
const TinkoffContainer = () => {
  const { alerts } = selectTinkoffState();
  const actions = useTinkoffActions();

  return <AlertPanel alerts={alerts} {...actions} />;
};

export default TinkoffContainer;
*/
