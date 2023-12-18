import { Form, Row, Col, Button } from "antd";
import { Checkbox } from "antd";
import { useState } from "react";
import FormHeader from "../../form/FormHeader";
import OrderLabeledInput from "../OrderLabeledInput";
import SearchIcon from "../../SearchIcon";
import FormTextArea from "../../form/FormTextArea";
import FormHeaderInput from "../../form/FormHeaderInput";
import FormDropDown from "../../form/FormDropdown";
import FormRadioButton from "../../form/FormRadioButton";
import PayeeInformationModal from "./PayeeInformationModal";
import "../../../../pages/styles/Order.css";

const PaymentInformationForm = () => {
  const paymentTypes = [
    {
      title: "Money",
      value: "money",
    },
    {
      title: "Product",
      value: "product",
    },
  ];
  const [openPayeeModal, setOpenPayeeModal] = useState(false);
  const [confirmPayeeModalLoading, setConfirmPayeeModalLoading] =
    useState(false);

  const showPayeeModal = () => {
    setOpenPayeeModal(true);
  };
  const handlePayeeModalOk = () => {
    setConfirmPayeeModalLoading(true);
    setTimeout(() => {
      setOpenPayeeModal(false);
      setConfirmPayeeModalLoading(false);
    }, 2000);
  };
  const handlePayeeModalCancel = () => {
    setOpenPayeeModal(false);
  };

  return (
    <Form>
      <FormHeader label={"PAYMENT INFORMATION"}>
        <FormRadioButton options={paymentTypes} />
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

      <PayeeInformationModal
        onOk={handlePayeeModalOk}
        confirmLoading={confirmPayeeModalLoading}
        open={openPayeeModal}
        onCancel={handlePayeeModalCancel}
      />

      <Row className="order-row">
        <Col span={24}>
          <OrderLabeledInput
            label="Mode of Pay."
            inputSpan={15}
            className="payment-form-text-input"
            InputComponent={() => (
              <Button
                className="grey-input-btn"
                onClick={showPayeeModal}
              ></Button>
            )}
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
