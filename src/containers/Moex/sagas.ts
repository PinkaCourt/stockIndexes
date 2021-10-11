import { put, select, takeEvery } from "redux-saga/effects";

import { weightStoksInPortfolio } from "utils";
import { HUNDRED_PERCENT } from "store/constants";
import { imoexBase } from "containers/Moex/data";
import { selectStocsCapitalization } from "containers/Tinkoff/selectors";
import { setTFPortfolio } from "containers/Tinkoff/actions";
import * as A from "./actions";
import * as T from "./types";

function* getMoexStoks({ payload }: ReturnType<typeof setTFPortfolio>) {
  //const {balance, isin, name, averagePositionPrice: {currency, value}} = payload

  const stocs: ReturnType<typeof selectStocsCapitalization> = yield select(
    selectStocsCapitalization
  );

  const ruStocsCapital = stocs ? stocs.RUB : 0;

  const stoksMap = imoexBase.reduce((accum, current) => {
    accum[current.ticker] = {
      ...payload[current.ticker],
      balance: payload[current.ticker]?.balance || "0",
      isin: payload[current.ticker]?.isin || "",
      name: payload[current.ticker]?.name || current.nameEn,
      weight: (current.weight * HUNDRED_PERCENT).toFixed(2),
      weightInPortfolio: weightStoksInPortfolio(
        ruStocsCapital,
        payload[current.ticker]?.averagePositionPrice.value,
        payload[current.ticker]?.balance
      ),
      bye: 0,
    };
    return accum;
  }, {} as T.StokMap);

  yield put(A.setStoksMap(stoksMap));
}

export default function* moexWatcher() {
  yield takeEvery(setTFPortfolio, getMoexStoks);
}
