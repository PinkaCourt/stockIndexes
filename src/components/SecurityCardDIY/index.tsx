import { useSelector } from "react-redux";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import StockProp from "components/StockProp";
import CardFooter from "./CardFooter";

import { selectStockProfile } from "containers/FullStockInfo/selectors";

import styles from "./styles.module.scss";

const currencyEnum = {
  USD: "$",
  RUB: "₽",
  EUR: "€",
};

const SecurityCard = () => {
  const stock = useSelector(selectStockProfile);

  if (!stock) return null;

  const exchange = `${stock.exchange} (${stock.exchangeShortName})`;

  return (
    <div className={styles.cardContainer}>
      <CardHeader
        avatar={
          <Avatar
            alt="MMM"
            src={stock.image}
            sx={{ width: 56, height: 56 }}
            variant="square"
          />
        }
        title={stock.companyName}
        subheader={stock.website}
      />

      <div>
        <StockProp name="CEO" value={stock.ceo} />
        <StockProp name="Дивиденды" />
        <StockProp name="Сплит" />
        <StockProp name="Биржа" value={exchange} />
        <StockProp name="Последние дивиденды" value={stock.lastDiv} />
        <StockProp name="Сектор" value={stock.sector} />
        <StockProp name="Рыночная капитализация" value={stock.mktCap} />
      </div>
      <CardFooter country={stock.country} sector={stock.sector} />
    </div>
  );
};

export default SecurityCard;
