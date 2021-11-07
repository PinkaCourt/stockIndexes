import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";
import TableSortLabel from "@mui/material/TableSortLabel";

import { Direction } from "common/types";
import { compareFn, revertDirection } from "common/utils";
import {
  selectDirection,
  selectOrderBy,
  selectExpectedStocksWeight,
} from "containers/Moex/selectors";
import { setDirectionMRBC, setOrderByMRBC } from "containers/Moex/actions";
import { OrderByMRBC, StocksMRBCFull } from "containers/Moex/types";
import { selectStockCapitalization } from "containers/Tinkoff/selectors";
import { selectRuPortfolio } from "containers/UserData/selectors";

const Moex = () => {
  const securities = useSelector(selectExpectedStocksWeight);
  const stockCapitalization = useSelector(selectStockCapitalization);
  const direction = useSelector(selectDirection);
  const orderBy = useSelector(selectOrderBy);
  const ruPortfolio = useSelector(selectRuPortfolio);

  const dispatch = useDispatch();

  const sortedSecurities = React.useMemo(() => {
    if (!securities) {
      return [];
    }
    return compareFn(
      Object.values(securities),
      orderBy,
      direction
    ) as StocksMRBCFull[];
  }, [direction, orderBy, securities]);

  if (!securities) {
    return null;
  }

  const tableHeads = [
    { id: "shortnames", name: "Название эмитента" },
    { id: "ticker", name: "Тикер" },
    { id: "isin", name: "ISIN" },
    { id: "issueSize", name: "Всего выпущено акций" },
    { id: "prevPrice", name: "Средневзвешенная цена акции" },
    { id: "stockCapitalization", name: "Капитализация акций" },
    { id: "weight", name: "Вес в индексе, %" },
    { id: "weightInPortfolio", name: "Количество в портфеле, шт" },
    { id: "balance", name: "Вес в портфеле, %" },
    { id: "toBuy", name: "Купить, шт" },
  ] as {
    id: OrderByMRBC;
    name: string;
  }[];

  const sortHandler = (order: OrderByMRBC) => {
    if (orderBy === order) {
      dispatch(setDirectionMRBC(revertDirection[direction] as Direction));
    } else {
      dispatch(setOrderByMRBC(order));
    }
  };

  return (
    <Table size="small" stickyHeader>
      <TableHead>
        <TableRow>
          {tableHeads.map(({ id, name }) => {
            return (
              <TableCell key={id} onClick={() => sortHandler(id)}>
                <TableSortLabel active={orderBy === id} direction={direction}>
                  {name}
                </TableSortLabel>
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedSecurities.map(
          ({
            shortnames,
            ticker,
            issueSize,
            prevPrice,
            isin,
            stockCapitalization,
            weight,
            weightInPortfolio,
            balance,
            toBuy,
          }) => (
            <TableRow key={ticker} hover>
              <TableCell>{shortnames}</TableCell>
              <TableCell>{ticker}</TableCell>
              <TableCell>{isin}</TableCell>
              <TableCell>{issueSize}</TableCell>
              <TableCell>{prevPrice}</TableCell>
              <TableCell>{stockCapitalization}</TableCell>
              <TableCell>{weight}</TableCell>
              <TableCell>{weightInPortfolio}</TableCell>
              <TableCell>{balance}</TableCell>
              <TableCell>{toBuy}</TableCell>
            </TableRow>
          )
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell>{stockCapitalization?.RUB}</TableCell>
          <TableCell>{ruPortfolio}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default Moex;
