import { useSelector } from "react-redux";
import { currencyBadgeEnum } from "common/types";
import StockProp from "components/StockProp";
import { selectStockProfile } from "containers/FullStockInfo/selectors";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";
import styles from "./styles.module.scss";

const SecurityCard = () => {
  const stock = useSelector(selectStockProfile);

  if (!stock) return null;

  const currency = currencyBadgeEnum[stock.currency];
  const exchange = `${stock.exchange} (${stock.exchangeShortName})`;
  const lastDiv = `${stock.lastDiv.toFixed(2)} ${currency}`;
  const mktCap = `${new Intl.NumberFormat("ru-RU").format(
    stock.mktCap
  )} ${currency}`;

  return (
    <div className={styles.cardContainer}>
      <CardHeader
        logo={stock.image}
        name={stock.companyName}
        web={stock.website}
      />
      <div className={styles.propsContainer}>
        <StockProp name="CEO" value={stock.ceo} />
        <StockProp name="Дивиденды" />
        <StockProp name="Сплит" />
        <StockProp name="Биржа" value={exchange} />
        <StockProp name="Последние дивиденды" value={lastDiv} />
        <StockProp name="Отрасль" value={stock.sector} />
        <StockProp name="Рыночная капитализация" value={mktCap} />
      </div>
      <CardFooter country={stock.country} sector={stock.sector} />
    </div>
  );
};

export default SecurityCard;
