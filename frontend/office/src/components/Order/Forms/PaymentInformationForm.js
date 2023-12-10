import "../Order.css";
import { Form, Row, Col, Button } from "antd";
import FormHeader from "../../Form/FormHeader";
import OrderLabeledInput from "../OrderLabeledInput";
import SearchIcon from "../../SearchIcon";
import FormTextArea from "../../Form/FormTextArea";
import FormHeaderInput from "../../Form/FormHeaderInput";
import FormDropDown from "../../Form/FormDropdown";
import { Checkbox } from "antd";
import FormRadioButton from "../../Form/FormRadioButton";

const PaymentInformationForm = () => {
  return (
    <Form>
      <FormHeader label={"PAYMENT INFORMATION"}>
        <FormRadioButton />
      </FormHeader>

      <Row className="order-row">
        <Col span={24}>
          <OrderLabeledInput
            label="Payee"
            inputSpan={14}
            searchIcon={<SearchIcon />}
            className="payment-form-text-input"
          />
        </Col>
      </Row>

      <Row className="order-row">
        <Col span={24}>
          <OrderLabeledInput
            label="Mode of Pay."
            inputSpan={15}
            className="payment-form-text-input"
          />
        </Col>
      </Row>

      <Row className="order-row point-of-payment">
        <Col span={24}>
          <OrderLabeledInput
            label="Point of Payment"
            inputSpan={15}
            InputComponent={FormTextArea}
            className="payment-form-text-input"
          />
        </Col>
      </Row>

      <Row className="order-row order-amount-row">
        <Col span={3}>
          <span className="app-text bold-title">I want</span>
        </Col>
        <Col span={7}>
          <FormDropDown />
        </Col>
        <Col span={7}>
          <FormHeaderInput label="Amount" inputSpan={24} />
        </Col>
        <Col span={5}>
          <FormDropDown />
        </Col>
      </Row>

      <Row className="order-row ">
        <Col span={10}>
          <Checkbox style={{ marginLeft: 10 }} onChange={() => {}}>
            Operation's on Hold
          </Checkbox>
        </Col>
        <Col span={14}>
          <Row>
            <Col span={18}>
              <Button className="gray-btn">Estimate Receipt</Button>
            </Col>
            <Col span={6}>
              <Button className="green-btn">Calculate</Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="order-row ">
        <Col span={24}>
          <OrderLabeledInput label="Memo" inputSpan={17} />
        </Col>
      </Row>
      <Row className="order-row" style={{ padding: 14 }}></Row>
    </Form>
  );
};

export default PaymentInformationForm;
