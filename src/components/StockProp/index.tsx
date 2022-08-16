interface Props {
  property: string;
  value: string | number;
}

const StockProp = ({ property, value }: Props) => {
  return (
    <div>
      <span>{property}:</span>
      <span>{value}</span>
    </div>
  );
};
export default StockProp;
