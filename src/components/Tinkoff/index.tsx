import React from "react";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

import { selectTFPortfolio } from "containers/Tinkoff/selectors";

//TODO norm #ffdd2d hover #fcc521

const TinkoffTable = () => {
  const securities = useSelector(selectTFPortfolio);

  if (!securities) {
    return null;
  }

  return (
    <Table size="small" stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell>Название ценной бумаги</TableCell>
          <TableCell>Тикер</TableCell>
          <TableCell>Количество, шт</TableCell>
          <TableCell>Количество лотов</TableCell>
          <TableCell>Oжидаемая доходность</TableCell>
          <TableCell>Средняя цена позиции</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.values(securities).map(
          ({
            name,
            ticker,
            balance,
            lots,
            expectedYield,
            averagePositionPrice,
          }) => (
            <TableRow key={name} hover>
              <TableCell>{name}</TableCell>
              <TableCell>{ticker}</TableCell>
              <TableCell>{balance}</TableCell>
              <TableCell>{lots}</TableCell>
              <TableCell>
                {expectedYield.value}, {expectedYield.currency}
              </TableCell>
              <TableCell>
                {averagePositionPrice.value}, {averagePositionPrice.currency}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};

export default TinkoffTable;
