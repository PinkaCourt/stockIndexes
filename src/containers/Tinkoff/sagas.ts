import { call, put, select, takeEvery } from "redux-saga/effects";

import { selectTinkoffToken } from "containers/UserData/selectors";
import { setTinkoffToken } from "containers/UserData/reducer";
import { getBrokerAccountId, getPortfolio, getAllStocks } from "api/tinkoff";
import * as A from "./actions";
import * as T from "./types";

function* getTFAccountId() {
  const token: ReturnType<typeof selectTinkoffToken> = yield select(
    selectTinkoffToken
  );

  const { accounts } = yield call(getBrokerAccountId, token);
  // TODO сделать выбор по счету а не хардкодить первый
  if (accounts.length > 0) {
    yield put(A.setTFAccountId(accounts[0].id));
    yield put(A.getTFPortfolio(accounts[0].id));
    yield put(A.getAllStocks());
  }
}

function* getTFPortfolio({ payload }: ReturnType<typeof A.getTFPortfolio>) {
  const token: ReturnType<typeof selectTinkoffToken> = yield select(
    selectTinkoffToken
  );

  const {
    positions,
    totalAmountShares,
    totalAmountBonds,
    totalAmountEtf,
    totalAmountCurrencies,
    totalAmountFutures,
  } = yield call(getPortfolio, payload, token);

  const total = (
    Number(totalAmountShares.units) +
    Number(totalAmountBonds.units) +
    Number(totalAmountEtf.units) +
    Number(totalAmountCurrencies.units) +
    Number(totalAmountFutures.units)
  ).toString();

  const balance = {
    totalAmountShares: totalAmountShares.units,
    totalAmountBonds: totalAmountBonds.units,
    totalAmountEtf: totalAmountEtf.units,
    totalAmountCurrencies: totalAmountCurrencies.units,
    totalAmountFutures: totalAmountFutures.units,
    total: total,
  };

  if (positions) {
    const positionMap: T.PositionMap = positions.reduce(
      (accum: any, current: T.Position) => {
        accum[current.figi] = current;
        return accum;
      },
      {} as T.PositionMap
    );

    yield put(A.setTFPortfolio(positionMap));
    yield put(A.setBalanceTF(balance));
    yield put(A.tinkoffIsDone());
  }
}

function* getAllStocksServer() {
  const token: ReturnType<typeof selectTinkoffToken> = yield select(
    selectTinkoffToken
  );

  const { instruments } = yield call(getAllStocks, token);

  if (instruments) {
    const instrumentMap: T.InstrumentMap = instruments.reduce(
      (accum: any, current: T.Instrument) => {
        accum[current.ticker] = current;
        return accum;
      },
      {} as T.InstrumentMap
    );
    yield put(A.setAllStocks(instrumentMap));
  }
}

export default function* tinkoffSaga() {
  yield takeEvery(setTinkoffToken, getTFAccountId);
  yield takeEvery(A.getTFPortfolio, getTFPortfolio);
  yield takeEvery(A.getAllStocks, getAllStocksServer);
}
