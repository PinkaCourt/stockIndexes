interface Props {
  name: string;
  value?: string | number;
}

const StockProp = ({ name, value = "" }: Props) => {
  return (
    <div>
      <span>{name}: </span>
      <span>{value}</span>
    </div>
  );
};
export default StockProp;
