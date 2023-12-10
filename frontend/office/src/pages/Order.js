import { Row, Col } from "antd";
import FormHeader from "../components/Form/FormHeader";

import SenderInformationForm from "../components/Order/Forms/SenderInformationForm";
import ReceiverInformationForm from "../components/Order/Forms/ReceiverInformationForm";
import PaymentInformationForm from "../components/Order/Forms/PaymentInformationForm";
import TransactionInformationForm from "../components/Order/Forms/TransactionInformation";
import OrderHeader from "../components/Order/OrderHeader";

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
