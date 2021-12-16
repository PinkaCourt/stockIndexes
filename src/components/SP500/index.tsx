import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";
import TableSortLabel from "@mui/material/TableSortLabel";

import { revertDirection } from "common/utils";
import {
  selectDirection,
  selectOrderBy,
  selectSortedStocksSP500,
} from "containers/SP500/selectors";
import { setDirectionSP500, setOrderBySP500 } from "containers/SP500/reducer";
import { OrderBySP500 } from "containers/SP500/types";
import { selectStockCapitalization } from "containers/Tinkoff/selectors";
import { selectUSDPortfolio } from "containers/UserData/selectors";

const SP500 = () => {
  const sortedStocksSP500 = useSelector(selectSortedStocksSP500);
  const stockCapitalization = useSelector(selectStockCapitalization);
  const direction = useSelector(selectDirection);
  const orderBy = useSelector(selectOrderBy);
  const usdPortfolio = useSelector(selectUSDPortfolio);

  const dispatch = useDispatch();

  if (!sortedStocksSP500) {
    return null;
  }

  const tableHeads = [
    { id: "company", name: "Название эмитента" },
    { id: "symbol", name: "Тикер" },
    { id: "isin", name: "ISIN" },
    { id: "lastPrice", name: "Последняя цена акции" },
    { id: "weight", name: "Вес в индексе, %" },
    { id: "weightInPortfolio", name: "Вес в портфеле, %" },
    { id: "balance", name: "Количество в портфеле, шт" },
    { id: "toBuy", name: "Купить, шт" },
  ] as {
    id: OrderBySP500;
    name: string;
  }[];

  const sortHandler = (order: OrderBySP500) => {
    if (orderBy === order) {
      dispatch(setDirectionSP500(revertDirection[direction]));
    } else {
      dispatch(setOrderBySP500(order));
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
        {sortedStocksSP500.map(
          ({
            company,
            symbol,
            weight,
            isin,
            lastPrice,
            weightInPortfolio,
            balance,
            toBuy,
          }) => (
            <TableRow key={symbol} hover>
              <TableCell>{company}</TableCell>
              <TableCell>{symbol}</TableCell>
              <TableCell>{isin}</TableCell>
              <TableCell>{lastPrice}</TableCell>
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
          <TableCell>{stockCapitalization?.USD}</TableCell>
          <TableCell>{usdPortfolio}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default SP500;
