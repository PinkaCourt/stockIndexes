import { call, put, takeEvery } from "redux-saga/effects";
import { StockProfileRaw } from "common/types";
import { getStockProfile } from "api/common";
import * as A from "./actions";

function* getFullStockInfoSaga({
  payload,
}: ReturnType<typeof A.getFullStockInfo>) {
  const profile: StockProfileRaw[] = yield call(getStockProfile, payload);
  yield put(A.setFullStockInfo(profile[0]));
}

export default function* stockProfileWatcher() {
  yield takeEvery(A.getFullStockInfo, getFullStockInfoSaga);
}
