import { Row, Col, Image } from "antd";
import AppPrimaryButton from "../AppPrimaryButton";
import OrderHeaderLink from "./OrderHeaderLink";
import OrderHeaderInfo from "./OrderHeaderInfo";

const OrderHeader = () => {
  return (
    <div className="order-header" style={{ marginBottom: 5 }}>
      <Row align={"middle"} style={{ marginBottom: 12 }}>
        <Col span={12}>
          <img src="/images/logo.png" width={100} alt="logo" />
        </Col>
        <Col span={12} align={"right"}>
          <OrderHeaderInfo title="User" value="Fereja Mohammed" />
          <OrderHeaderInfo title="Agency" value="Se001 -Agency sa" />
        </Col>
      </Row>
      <Row style={{ padding: "0 10px" }}>
        <Col span={12}>
          <AppPrimaryButton label="Show me Balance & Credit Limit" />
        </Col>
        <Col span={12} align={"right"}>
          <OrderHeaderLink label="Search Customer" />
          <OrderHeaderLink label="Main Page" />
          <OrderHeaderLink label="Logout" />
        </Col>
      </Row>
    </div>
  );
};

export default OrderHeader;
