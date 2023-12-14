import "../../../../pages/styles/Order.css";
import { Form, Row, Col, Button } from "antd";
import FormHeader from "../../form/FormHeader";
import OrderLabeledInput from "../OrderLabeledInput";
import FormRadioButton from "../../form/FormRadioButton";
import AppPrimaryButton from "../../AppPrimaryButton";

const TransactionInfo = ({ title, value, titleSpan = 14, valueSpan = 10 }) => {
  return (
    <Row justify="space-between" style={{ marginLeft: 20, marginRight: 20 }}>
      <Col span={titleSpan}>
        <p className="app-text">{title}</p>
      </Col>
      <Col span={valueSpan} align="left">
        <p className="app-text bold-title">{value} </p>
      </Col>
    </Row>
  );
};

const TransactionInformationForm = () => {
  const printerTypes = [
    {
      title: "Regular",
      value: "regular",
    },
    {
      title: "Small",
      value: "small",
    },
  ];

  return (
    <Form>
      <FormHeader label={"TRANSACTION INFORMATION"} titleSpan={24} />
      <Row className="order-row">
        <Col span={12}>
          <TransactionInfo title="Amount Sent" value="USD 100.0" />
        </Col>
        <Col span={12}>
          <TransactionInfo title="Rate" value="114.500" />
        </Col>
      </Row>

      <Row className="order-row">
        <Col span={24}>
          <TransactionInfo
            title="To Receive"
            value="ETB 11,450.00"
            titleSpan={13}
            valueSpan={11}
          />
        </Col>
      </Row>

      <Row className="order-row">
        <Col span={12}>
          <TransactionInfo title="Fee" value="USD 0.0" />
        </Col>
        <Col span={12}>
          <TransactionInfo title="Commission" value="USD 5.00" />
        </Col>
      </Row>

      <Row className="order-row">
        <Col span={12}>
          <TransactionInfo title="Handling" value="USD 0.0" />
        </Col>
        <Col span={12}>
          <TransactionInfo title="Deliv." value="USD 5.00" />
        </Col>
      </Row>

      <Row className="order-row order-amount-row order-total-row">
        <Col span={6} style={{ marginLeft: 10 }}>
          <span className="order-total">TOTAL</span>
        </Col>
        <Col span={12}>
          <span className="order-total">USD 105.00</span>
        </Col>
      </Row>

      <Row className="order-row ">
        <Col span={24}>
          <OrderLabeledInput label="Message" inputSpan={17} />
        </Col>
      </Row>
      <Row className="order-row ">
        <Col span={20}>
          <OrderLabeledInput label="Discount Coupon" inputSpan={16} />
        </Col>
        <AppPrimaryButton label="Apply" />
      </Row>
      <Row className="order-row"></Row>
      <Row className="order-row">
        <Button className="yellow-btn change-rate-btn">
          Change Rate/Handling
        </Button>
      </Row>
      <Row className="order-row" style={{ paddingLeft: 10 }}>
        <Col span={8}>
          <p className="app-text">SELECT PRINTER</p>
        </Col>
        <Col span={8}>
          <FormRadioButton options={printerTypes} />
        </Col>
        <Col span={8} align={"right"}>
          <Button className="gray-btn" style={{ width: 120 }}>
            PROCESS
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default TransactionInformationForm;
