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
} from "containers/UserData/actions";

interface Props {
  open: boolean;
  handleCloseDialog: () => void;
}

const UserDataDialog = ({ open, handleCloseDialog }: Props) => {
  const [token, setToken] = React.useState("");
  const [ruPortfolio, setRuPortfolio] = React.useState(0);

  const dispatch = useDispatch();

  const handleClickOK = () => {
    dispatch(setTinkoffToken(token));
    dispatch(setWishedRuPortfolio(ruPortfolio));
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

  const portfolios = [
    {
      id: "ru",
      label: "Желаемый портфель в рублях",
      value: ruPortfolio,
      fnChange: handleRuPortfolioChange,
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
