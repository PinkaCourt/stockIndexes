import { createSelector } from "reselect";
/*
import { InitState } from "store/reducer";
import * as T from "store/types";

export const selectBrokerAccountId = (state: InitState) =>
  state.brokerAccountId;
export const selectPortfolio = (state: InitState) => state.portfolio;
*/
/*
const selectSortedData = createSelector(selectStatist, (data) =>
  data?.slice().sort((a, b) => a.date - b.date)
);

const selectLastDate = createSelector(
  selectSortedData,
  (data) => data[data.length - 1].date
);

const startMonthlyPeriod = new Date().setMonth(
  new Date().getMonth() - ONE_MONTH // selectLastDate
);
const start4MonthlyPeriod = new Date().setMonth(
  new Date().getMonth() - FOUR_MONTH //selectLastDate
);
const endPeriod = Date.now();

const averageDSbyMonth = (ar: T.Statistic[]) => {
  let newData = [];
  let accumulatorData = 0;
  let count = 0;
  for (let i = 0; i < ar.length; i++) {
    if (i === 0) {
      accumulatorData = parseFloat(ar[i].ds);
      count = 1;
    } else {
      const thisDate = ar[i].date;
      const prevDate = ar[i - 1].date;

      const thisDay = new Date(thisDate).getDate();
      const prevDay = new Date(prevDate).getDate();

      const thisMonth = new Date(thisDate).getMonth();
      const prevMonth = new Date(prevDate).getMonth();

      if (thisDay === prevDay && thisMonth === prevMonth) {
        accumulatorData = accumulatorData + parseFloat(ar[i].ds);
        count = count + 1;
      } else {
        newData.push({
          ds: accumulatorData / count,
          month: prevMonth,
          day: prevDay,
        });
        accumulatorData = 0;
        count = 0;
      }
    }
  }

  return newData;
};

export const monthlyData = createSelector(selectSortedData, (sortedData) =>
  sortedData.filter(
    (mnt) => mnt.date > startMonthlyPeriod && mnt.date < endPeriod
  )
);

export const FourMonthsData = createSelector(selectSortedData, (sortedData) =>
  sortedData.filter(
    (mnt) => mnt.date > start4MonthlyPeriod && mnt.date < endPeriod
  )
);

export const lastDatas = createSelector(
  monthlyData,
  (data) => data[data.length - 1]
);

export const selectAverageDatas = createSelector(FourMonthsData, (data) =>
  averageDSbyMonth(data)
);
*/
