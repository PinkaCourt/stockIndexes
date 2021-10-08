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

  return (
    <Table size="small" stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell>Название ценной бумаги</TableCell>
          <TableCell>Тикер</TableCell>
          <TableCell>Количество, шт</TableCell>
          <TableCell>Количество лотов</TableCell>
          <TableCell>Oжидаемая доходность</TableCell>
          <TableCell>Средняя цена Позиции</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {securities.map((security) => (
          <TableRow
            key={security.name}
            hover
            //sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell>{security.name}</TableCell>
            <TableCell>{security.ticker}</TableCell>
            <TableCell>{security.balance}</TableCell>
            <TableCell>{security.lots}</TableCell>
            <TableCell>{security.expectedYield.value}</TableCell>
            <TableCell>{security.averagePositionPrice.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TinkoffTable;
