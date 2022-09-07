import styles from "./styles.module.scss";
import financial from "/icons/financial.svg";

import { ReactComponent as Financial } from "icons/financial.svg";

export interface Props {
  country: string;
  sector: string;
}

const CardFooter = ({ country, sector }: Props) => {
  const countryCode = country.toLowerCase();
  const countryFlag = `https://ipdata.co/flags/${countryCode}.png`;

  return (
    <div className={styles.footer}>
      <div>
        <img src={countryFlag} alt="flag" />
        <span className={styles.title}>{country}</span>
      </div>
      <div>
        <span className={styles.title}>{sector}</span>
        <img src={"/icons/financial.svg"} alt="flag" />
      </div>
    </div>
  );
};

export default CardFooter;

//   <img src={financial} alt="flag" />
