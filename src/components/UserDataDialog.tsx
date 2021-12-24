import React from "react";
import { useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import {
  setTinkoffToken,
  setWishedRuPortfolio,
  setWishedUsdPortfolio,
  setWishedEurPortfolio,
} from "containers/UserData/reducer";

interface Props {
  open: boolean;
  handleCloseDialog: () => void;
}

const UserDataDialog = ({ open, handleCloseDialog }: Props) => {
  const [token, setToken] = React.useState("");
  const [ruPortfolio, setRuPortfolio] = React.useState(0);
  const [usdPortfolio, setUsdPortfolio] = React.useState(0);
  const [eurPortfolio, setEurPortfolio] = React.useState(0);

  const dispatch = useDispatch();

  const handleClickOK = () => {
    dispatch(setTinkoffToken(token));
    dispatch(setWishedRuPortfolio(ruPortfolio));
    dispatch(setWishedUsdPortfolio(usdPortfolio));
    dispatch(setWishedEurPortfolio(eurPortfolio));
    handleCloseDialog();
  };

  const handleTokenChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setToken(value);
  };

  const handleRuPortfolioChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setRuPortfolio(Number(value));
  };
  const handleUsdPortfolioChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setUsdPortfolio(Number(value));
  };
  const handleEurPortfolioChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setEurPortfolio(Number(value));
  };

  const portfolios = [
    {
      id: "ru",
      label: "Желаемый портфель в рублях",
      value: ruPortfolio,
      fnChange: handleRuPortfolioChange,
    },
    {
      id: "usd",
      label: "Желаемый портфель в долларах",
      value: usdPortfolio,
      fnChange: handleUsdPortfolioChange,
    },
    {
      id: "eur",
      label: "Желаемый портфель в евро",
      value: eurPortfolio,
      fnChange: handleEurPortfolioChange,
    },
  ];

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogContentText>
          Введите токен Тинькофф банка и сумму портфеля в рублях
        </DialogContentText>
        <TextField
          id="token"
          type="text"
          label="Токен Tinkoff"
          margin="dense"
          variant="outlined"
          fullWidth
          autoFocus
          required
          onChange={handleTokenChange}
        />
        {portfolios.map(({ id, label, value, fnChange }) => {
          return (
            <TextField
              key={id}
              id={id}
              label={label}
              value={value}
              onChange={fnChange}
              type="number"
              margin="dense"
              variant="outlined"
              fullWidth
              required
              InputProps={{ inputProps: { min: 0 } }}
            />
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleClickOK}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDataDialog;
