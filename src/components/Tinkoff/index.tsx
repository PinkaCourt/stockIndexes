import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableSortLabel from "@mui/material/TableSortLabel";

import { Direction } from "common/types";
import { revertDirection } from "common/utils";
import {
  selectDirection,
  selectOrderBy,
  selectSortedTFPortfolio,
} from "containers/Tinkoff/selectors";
import { setDirectionTF, setOrderByTF } from "containers/Tinkoff/actions";
import { OrderByTF } from "containers/Tinkoff/types";

const TinkoffTable = () => {
  const securities = useSelector(selectSortedTFPortfolio);
  const direction = useSelector(selectDirection);
  const orderBy = useSelector(selectOrderBy);

  const dispatch = useDispatch();

  if (!securities) {
    return null;
  }

  const tableHeads = [
    { id: "name", name: "Название ценной бумаги" },
    { id: "ticker", name: "Тикер" },
    { id: "balance", name: "Количество, шт" },
    { id: "lots", name: "Количество лотов" },
    { id: "expectedYield", name: "Oжидаемая доходность" },
    { id: "averagePositionPrice", name: "Средняя цена позиции" },
  ] as {
    id: OrderByTF;
    name: string;
  }[];

  const sortHandler = (order: OrderByTF) => {
    if (orderBy === order) {
      dispatch(setDirectionTF(revertDirection[direction] as Direction));
    } else {
      dispatch(setOrderByTF(order));
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
        {securities.map(
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
