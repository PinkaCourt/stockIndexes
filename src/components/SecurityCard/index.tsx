import react from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StockProp from "components/StockProp";
import { NormalizeStocks, OrderByTF } from "containers/Tinkoff/types";
import { selectStockProfile } from "containers/FullStockInfo/selectors";
/*
https://finnhub.io/api/v1/stock/profile2?isin=IE00BZ12WP82&token=c5n5guaad3ido15tr8og
{
    "country": "GB",
    "currency": "USD",
    "exchange": "NEW YORK STOCK EXCHANGE, INC.",
    "finnhubIndustry": "Chemicals",
    "ipo": "2018-10-31",
    "logo": "https://static.finnhub.io/logo/b8fe2cdc-81d4-11ea-bd4e-00000000092a.png",
    "marketCapitalization": 156518.37245357825,
    "name": "Linde PLC",
    "phone": "441483242200.0",
    "shareOutstanding": 503.453,
    "ticker": "LIN",
    "weburl": "https://www.linde.com/"
}
<img src="https://ipdata.co/flags/us.png" alt="Smiley face">


https://financialmodelingprep.com/api/v3/profile/MMM?apikey=d436d494b581048e94f7391c30ebc049



 {
        "symbol": "MMM",
        "price": 137.65,
        "beta": 0.915607,
        "volAvg": 2908549,
        "mktCap": 78330970112,
        "lastDiv": 5.9399999999999995,
        "range": "137.58-203.59",
        "changes": -6.53,
        "companyName": "3M Company",
        "currency": "USD",
        "cik": "0000066740",
        "isin": "US88579Y1010",
        "cusip": "88579Y101",
        "exchange": "New York Stock Exchange",
        "exchangeShortName": "NYSE",
        "industry": "Conglomerates",
        "website": "https://www.3m.com",
        "description": "3M Company operates as a diversified technology company worldwide. It operates through four segments: Safety and Industrial; Transportation and Electronics; Health Care; and Consumer. The Safety and Industrial segment offers industrial abrasives and finishing for metalworking applications; autobody repair solutions; closure systems for personal hygiene products, masking, and packaging materials; electrical products and materials for construction and maintenance, power distribution, and electrical original equipment manufacturers; structural adhesives and tapes; respiratory, hearing, eye, and fall protection solutions; and natural and color-coated mineral granules for shingles. The Transportation and Electronics segment provides ceramic solutions; attachment tapes, films, sound, and temperature management for transportation vehicles; premium large format graphic films for advertising and fleet signage; light management films and electronics assembly solutions; packaging and interconnection solutions; and reflective signage for highway, and vehicle safety. The Healthcare segment offers food safety indicator solutions; health care procedure coding and reimbursement software; skin, wound care, and infection prevention products and solutions; dentistry and orthodontia solutions; and filtration and purification systems. The Consumer segment provides consumer bandages, braces, supports and consumer respirators; cleaning products for the home; retail abrasives, paint accessories, car care DIY products, picture hanging, and consumer air quality solutions; and stationery products. It offers its products through e-commerce and traditional wholesalers, retailers, jobbers, distributors, and dealers. The company was founded in 1902 and is based in St. Paul, Minnesota.",
        "ceo": "Mr. Michael Roman",
        "sector": "Industrials",
        "country": "US",
        "fullTimeEmployees": "95000",
        "phone": "16517331474",
        "address": "3M Center, Bldg. 220-13E-26A",
        "city": "Saint Paul",
        "state": "MINNESOTA",
        "zip": "55144-1000",
        "dcfDiff": 7.79771,
        "dcf": 145.448,
        "image": "https://financialmodelingprep.com/image-stock/MMM.png",
        "ipoDate": "1946-01-14",
        "defaultImage": false,
        "isEtf": false,
        "isActivelyTrading": true,
        "isAdr": false,
        "isFund": false
    }





*/

const SecurityCard = () => {
  const stock = useSelector(selectStockProfile);

  if (!stock) return null;

  const countryCode = stock.country.toLowerCase();
  const countryFlag = `https://ipdata.co/flags/${countryCode}.png`;
  const exchange = `${stock.exchange} (${stock.exchangeShortName})`;

  return (
    <Card
      sx={{
        maxWidth: 1345,
        position: "absolute",
        zIndex: 100,
        top: "15%",
        left: "25%",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            alt="MMM"
            src={stock.image}
            sx={{ width: 56, height: 56 }}
            variant="square"
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={stock.companyName}
        subheader={stock.website}
      />
      <CardMedia
        component="img"
        height="40"
        image="https://static.finnhub.io/logo/b8fe2cdc-81d4-11ea-bd4e-00000000092a.png"
        alt="заготовка для отрасли"
      />
      <CardContent>
        <StockProp name="CEO" value={stock.ceo} />
        <StockProp name="website" value={stock.website} />
        <StockProp name="Биржа" value={exchange} />
        <StockProp name="Страна" value={stock.country} />
        <StockProp name="Валюта" value={stock.currency} />
        <StockProp name="Последние дивиденды" value={stock.lastDiv} />
        <StockProp name="Сектор" value={stock.sector} />
        <StockProp name="Рыночная капитализация" value={stock.mktCap} />

        <img src={countryFlag} alt="flag" />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default SecurityCard;
