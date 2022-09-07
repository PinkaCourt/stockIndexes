import styles from "./styles.module.scss";

export interface Props {
  logo: string;
  name: string;
  web: string;
}

const CardHeader = ({ logo, name, web }: Props) => {
  return (
    <div className={styles.header}>
      <img src={logo} alt="logo" className={styles.logo} />
      <div className={styles.nameContainer}>
        <span className={styles.title}>{name}</span>
        <a className={styles.link} href={web} target="_blank" rel="noreferrer">
          {web}
        </a>
      </div>
    </div>
  );
};

export default CardHeader;
