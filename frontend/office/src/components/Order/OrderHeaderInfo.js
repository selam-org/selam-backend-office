const OrderHeaderInfo = ({ title, value }) => {
  return (
    <>
      <span className="header-info-title">{title}</span>
      <span className="header-info-value">{value}</span>
    </>
  );
};

export default OrderHeaderInfo;
