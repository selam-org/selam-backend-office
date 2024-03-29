import { Form, Row, Col, Button } from "antd";
import FormHeader from "../../form/FormHeader";
import OrderLabeledInput from "../OrderLabeledInput";
import FormRadioButton from "../../form/FormRadioButton";
import AppPrimaryButton from "../../AppPrimaryButton";
import "../../../../pages/styles/Order.css";
import UpdateRate from "./UpdateRate";
import { useDispatch, useSelector } from "react-redux";
import {
  getTransInfo,
  getIsCalculated,
  getTransactionById,
  getReceiver,
  getTranRate,
  getPayment,
} from "../../../../store/transactions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CashManagementModal from "./CashManagementModal";
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
  const { senderId } = useParams();
  const isCalculate = useSelector(getIsCalculated);
  const receiver = useSelector(getReceiver);
  const sender = useSelector((state) => getTransactionById(state, senderId));
  const transInfo = useSelector(getTransInfo);
  const payment = useSelector(getPayment);
  console.log(transInfo, "calculate transinfo");
  console.log(
    sender,
    isCalculate,
    receiver,
    payment,
    transInfo,
    "Payment Set 4",
    sender && isCalculate && receiver && payment && transInfo
  );
  useEffect(() => {}, [transInfo]);
  const [openUpdaterModal, setOpenUpdaterModal] = useState(false);
  const [confirmUpdaterModalLoading, setConfirmUpdaterModalLoading] =
    useState(false);
  const [detail, setDetail] = useState("");
  const showUpdaterModal = () => {
    setOpenUpdaterModal(true);
  };
  const handleUpdaterModalOk = () => {
    setConfirmUpdaterModalLoading(true);
    setTimeout(() => {
      setOpenUpdaterModal(false);
      setConfirmUpdaterModalLoading(false);
    }, 2000);
  };
  const handleUpdaterModalCancel = () => {
    setOpenUpdaterModal(false);
  };
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
  const [openProcessModal, setOpenProcessModal] = useState(false);
  const [confirmProcessModalLoading, setConfirmProcessModalLoading] =
    useState(false);
  const showProcessModal = () => {
    setOpenProcessModal(true);
  };
  const handleProcessModalOk = () => {
    setConfirmProcessModalLoading(true);
    setTimeout(() => {
      setOpenProcessModal(false);
      setConfirmProcessModalLoading(false);
    }, 2000);
  };
  const handleProcessModalCancel = () => {
    setOpenProcessModal(false);
  };

  return (
    <Form>
      <FormHeader label={"TRANSACTION INFORMATION"} titleSpan={24} />
      <CashManagementModal
        onOk={setOpenProcessModal}
        confirmLoading={confirmProcessModalLoading}
        open={openProcessModal}
        onCancel={handleProcessModalCancel}
      />
      <Row className="order-row">
        <Col span={12}>
          <TransactionInfo
            title="Amount Sent"
            value={transInfo ? `USD ${transInfo.sent}` : ""}
          />
        </Col>
        <Col span={12}>
          <TransactionInfo
            title="Rate"
            value={transInfo ? `ETB ${transInfo.rate}` : ""}
          />
        </Col>
      </Row>

      <Row className="order-row">
        <Col span={24}>
          <TransactionInfo
            title="To Receive"
            value={transInfo ? `ETB ${transInfo.receive}` : ""}
            titleSpan={13}
            valueSpan={11}
          />
        </Col>
      </Row>

      <Row className="order-row">
        <Col span={12}>
          <TransactionInfo
            title="Fee"
            value={transInfo ? `USD ${transInfo.fee}` : ""}
          />
        </Col>
        <Col span={12}>
          <TransactionInfo
            title="Commission"
            value={transInfo ? `USD ${transInfo.commission}` : ""}
          />
        </Col>
      </Row>

      <Row className="order-row">
        <Col span={12}>
          <TransactionInfo
            title="Handling"
            value={transInfo ? `USD ${transInfo.handling}` : ""}
          />
        </Col>
        <Col span={12}>
          <TransactionInfo
            title="Deliv."
            value={transInfo ? `USD ${transInfo.deliv}` : ""}
          />
        </Col>
      </Row>

      <Row className="order-row order-amount-row order-total-row">
        <Col span={6} style={{ marginLeft: 10 }}>
          <span className="order-total">TOTAL</span>
        </Col>
        <Col span={12}>
          <span className="order-total">
            {transInfo ? `USD ${transInfo.total}` : ""}
          </span>
        </Col>
      </Row>

      <Row className="order-row ">
        <Col span={24}>
          <OrderLabeledInput
            className="white-input"
            label="Message"
            inputSpan={17}
          />
        </Col>
      </Row>
      <Row className="order-row ">
        <Col span={20}>
          <OrderLabeledInput
            className="white-input"
            label="Discount Coupon"
            inputSpan={15}
          />
        </Col>
        <AppPrimaryButton label="Apply" />
      </Row>
      <Row className="order-row"></Row>
      <Row className="order-row">
        {isCalculate ? (
          <></>
        ) : (
          <Button
            onClick={showUpdaterModal}
            className="yellow-btn change-rate-btn"
          >
            Change Rate/Handling
          </Button>
        )}
        <UpdateRate
          onOk={handleUpdaterModalOk}
          confirmLoading={confirmUpdaterModalLoading}
          open={openUpdaterModal}
          onCancel={handleUpdaterModalCancel}
        />
      </Row>
      <Row className="order-row" style={{ paddingLeft: 10 }}>
        <Col span={8}>
          <p className="app-text">SELECT PRINTER</p>
        </Col>
        <Col span={8}>
          <FormRadioButton options={printerTypes} />
        </Col>
        <Col span={8} align={"right"}>
          <Button
            // disabled={true}
            //  className="gray-btn"
            disabled={
              !(payment && sender && receiver && !isCalculate && transInfo)
            }
            style={{ width: 120 }}
            className="green-btn"
            onClick={showProcessModal}
          >
            PROCESS
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default TransactionInformationForm;
