import { Row, Col } from "antd";
import FormHeader from "../../components/form/FormHeader";

import SenderInformationForm from "../../components/order/Forms/SenderInformationForm";
import ReceiverInformationForm from "../../components/order/Forms/ReceiverInformationForm";
import PaymentInformationForm from "../../components/order/Forms/PaymentInformationForm";
import TransactionInformationForm from "../../components/order/Forms/TransactionInformation";
import OrderHeader from "../../components/order/OrderHeader";

const Order = () => {
  return (
    <div className="order-page">
      <OrderHeader />
      <SenderInformationForm />
      <ReceiverInformationForm />
      <Row gutter={5}>
        <Col span={12}>
          <PaymentInformationForm />
        </Col>
        <Col span={12}>
          <TransactionInformationForm />
        </Col>
      </Row>
      <FormHeader
        titleSpan={24}
        label={
          " © Copyrights 2021 - White Wings Technologies-MTS ENTERPRISE 5.10"
        }
        style={{ marginTop: 30 }}
      ></FormHeader>
    </div>
  );
};

export default Order;
