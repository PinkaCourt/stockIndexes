import React from "react";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";

import { selectExpectedStocksWeight } from "containers/Moex/selectors";
import { selectStockCapitalization } from "containers/Tinkoff/selectors";
import { selectRuPortfolio } from "containers/UserData/selectors";

const Moex = () => {
  const securities = useSelector(selectExpectedStocksWeight);
  const stockCapitalization = useSelector(selectStockCapitalization);

  const ruPortfolio = useSelector(selectRuPortfolio);

  if (!securities) {
    return null;
  }

  const tableHeads = [
    "Название эмитента",
    "Тикер",
    "ISIN",
    "Всего выпущено акций",
    "Средневзвешенная цена акции",
    "Капитализация акций",
    "Вес в индексе, %",
    "Количество в портфеле, шт",
    "Вес в портфеле, %",
    "Купить, шт",
  ];

  return (
    <Table size="small" stickyHeader>
      <TableHead>
        <TableRow>
          {tableHeads.map((tableHead, idx) => {
            return <TableCell key={idx}>{tableHead}</TableCell>;
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.values(securities).map(
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
