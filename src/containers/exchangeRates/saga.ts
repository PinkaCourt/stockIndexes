import { call, fork, put } from "redux-saga/effects";

import { getExchangeRates } from "api/common";
import { setExchangeRates } from "./reducer";

function* getExchangeRatesSaga() {
  const { Valute } = yield call(getExchangeRates);

  yield put(
    setExchangeRates({
      EUR: Valute["EUR"].Value,
      USD: Valute["USD"].Value,
    })
  );
}

export default function* exchangeRatesWatcher() {
  yield fork(getExchangeRatesSaga);
}
