const OrderHeaderLink = ({ label, to }) => {
  return (
    <>
      <span className="order-header-link-pipe">|</span>
      <span className="order-header-link">{label}</span>
    </>
  );
};

export default OrderHeaderLink;
