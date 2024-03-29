import { Form, Row, Col, Button } from "antd";
import { Checkbox } from "antd";
import { useEffect, useState } from "react";
import FormHeader from "../../form/FormHeader";
import OrderLabeledInput from "../OrderLabeledInput";
import SearchIcon from "../../SearchIcon";
import FormTextArea from "../../form/FormTextArea";
import FormHeaderInput from "../../form/FormHeaderInput";
import FormDropDown from "../../form/FormDropdown";
import FormRadioButton from "../../form/FormRadioButton";
import PayeeInformationModal from "./PayeeInformationModal";
import "../../../../pages/styles/Order.css";
import AlertModal from "./AlertModal";
import UpdateRate from "./UpdateRate";
import CashManagementModal from "./CashManagementModal";
import CustomerDocumentationModal from "./CustomerDocumentationModal";

import { useDispatch, useSelector } from "react-redux";
import {
  getPayment,
  getCommissionsTranApiCall,
  getCommissions,
  getCommissionLoading,
  getCommissionErrors,
  getAgencyApiCall,
  getCommissionError,
  getAgency,
  setIsCalculate,
  getIsCalculated,
  setTransInfo,
  getTransInfo,
  getTranRate,
  getReceiver,
  getPaymentInfo,
  setTranRate,
} from "../../../../store/transactions";
const PaymentInformationForm = () => {
  const dispatch = useDispatch();
  const paymentInfo = useSelector(getPaymentInfo);
  const receiver = useSelector(getReceiver);
  const [form] = Form.useForm();
  const payment = useSelector(getPayment);
  const commissions = useSelector(getCommissions);
  const commissionError = useSelector(getCommissionError);
  const agency = useSelector(getAgency);
  const rate = useSelector(getTranRate);

  const isCalculate = useSelector(getIsCalculated);
  const transInfo = useSelector(getTransInfo);
  useEffect(() => {
    handleCalculate();
  }, [rate]);
  useEffect(() => {
    if (agency) {
      dispatch(setTranRate(agency.default_rate));
    }
    form.setFieldsValue({
      calculation_option: 0,
      moneyTypes: "CHECK",
      // amount: ,
    });
  }, []);
  const calculate = (values) => {
    const option = calculation_option.find(
      (option) => option.value === values.calculation_option
    );
    console.log(option, "calculate calFunc");
    // if (!option) return;

    const data = option.calculate(values.amount);
    console.log(data, "calculate data");
    dispatch(setTransInfo(data));
  };
  const handleCalculate = () => {
    dispatch(getCommissionsTranApiCall());
    dispatch(getAgencyApiCall());
    form
      .validateFields()
      .then((values) => {
        console.log(values, "calculate");
        if (isCalculate) {
          setOpenAlertModal(true);
        }
        dispatch(setIsCalculate(false));
        calculate(values);
      })
      .catch((er) => {
        console.log(er);
      });
  };
  const calculation_option = [
    {
      value: 0,
      title: "to Send a total of",

      calculate: (amount) => {
        amount = parseFloat(amount);
        const coms = [...commissions];
        coms.sort((a, b) => parseFloat(a.end) - parseFloat(b.end));
        let com;
        let minVal = 0;
        console.log(coms, "calculate first");
        for (let i = 0; i < coms.length; i++) {
          const item = coms[i];
          const [end, commission] = [
            parseFloat(item.end),
            parseFloat(item.commission),
          ];
          if (minVal <= amount && amount <= end) {
            com = commission;
            break;
          } else if (i === coms.length - 1) {
            com = commission;
          }
          minVal = end;
        }

        console.log(
          amount,
          "calculate  last",
          com,
          amount,
          com / 100,
          amount * (com / 100),
          rate
        );
        return {
          fee: 0.0,
          receive: parseFloat(amount * rate).toFixed(2),
          rate: parseFloat(rate).toFixed(4),
          handling: 0.0,
          deliv: 0.0,
          commission: parseFloat(amount * (com / 100)).toFixed(2),
          total: parseFloat(amount + amount * (com / 100)).toFixed(2),
          sent: parseFloat(amount).toFixed(2),
        };
      },
    },
    {
      value: 1,
      title: "to Send a total with fee",
      calculate: (amount) => {
        amount = parseFloat(amount);
        const coms = [...commissions];

        coms.sort((a, b) => parseFloat(a.end) - parseFloat(b.end));
        let com;
        let minVal = 0;
        console.log(coms, "calculate first");
        let amountWithoutFee = 0;
        for (let i = 0; i < coms.length; i++) {
          const item = coms[i];
          const [end, commission] = [
            parseFloat(item.end),
            parseFloat(item.commission),
          ];
           amountWithoutFee =  (100 * amount)/(100 + commission)
          console.log(amountWithoutFee, "amountWithoutFee", minVal, end, commission, amount);
          if (minVal <= amountWithoutFee && amountWithoutFee <= end) {
            com = commission;
            break;
          } else if (i === coms.length - 1) {
            com = commission;
          }
          minVal = end;
        }

        console.log(
          amount,
          "calculate  last",
          com,
          amount,
          com / 100,
          amount * (com / 100),
          rate
        );
        return {
          fee: 0.0,
          receive: parseFloat(amountWithoutFee * rate).toFixed(2),
          rate: parseFloat(rate).toFixed(4),
          handling: 0.0,
          deliv: 0.0,
          commission: parseFloat(amountWithoutFee * (com / 100)).toFixed(2),
          total: parseFloat(amountWithoutFee + amountWithoutFee * (com / 100)).toFixed(2),
          sent: parseFloat(amountWithoutFee).toFixed(2),
        };
        return {
          fee: 0,
          receive: 0,
          rate: parseFloat(rate).toFixed(4),
          handling: 0,
          deliv: 0,
          commission: 0,
          total: amount,
          sent: amount,
        };
      },
    },
    {
      value: 2,
      title: "to Receive a total of",
      calculate: (amount) => {
        amount = parseFloat(amount);
        const coms = [...commissions];
        coms.sort((a, b) => parseFloat(a.end) - parseFloat(b.end));
        let com;
        let minVal = 0;
        const value = amount / rate;
        console.log(value, "lastcalculate", coms);
        console.log(coms, "calculate first");
        for (let i = 0; i < coms.length; i++) {
          const item = coms[i];
          const [end, commission] = [
            parseFloat(item.end),
            parseFloat(item.commission),
          ];
          if (minVal <= value && value <= end) {
            console.log("lastcalculate 2", commission, value, end, minVal);
            com = commission;
            break;
          } else if (i === coms.length - 1) {
            com = commission;
          }
          minVal = end;
        }
        console.log(coms, "lastcalculate 3 rec", com);
        return {
          fee: 0.0,
          receive: parseFloat(amount).toFixed(2),
          rate: parseFloat(rate).toFixed(4),
          handling: 0.0,
          deliv: 0.1,
          commission: parseFloat(value * (com / 100)).toFixed(2),
          total: parseFloat(value + value * (com / 100)).toFixed(2),
          sent: parseFloat(value).toFixed(2),
        };
      },
    },
  ];
  const moneyTypes = [
    {
      value: "CHECK",
      title: "CHECK",
    },
    {
      value: "CASH",
      title: "CASH",
    },
  ];
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
  const [detail, setDetail] = useState("");
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
  useEffect(() => {
    dispatch(getCommissionsTranApiCall());
  }, []);
  useEffect(() => {
    if (payment) {
      setDetail(
        `PC > ethiopia payee partner\ndemo payer address\n4444\nBANK > ${
          payment.bank_name
        }\nBranch > ${payment.branch ? payment.branch : ""}\nAccount Number > ${
          payment.bank_account
        }`
      );
      console.log(payment, "payment");
    }
  }, [payment]);
  useEffect(() => {}, [detail]);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [confirmAlertModalLoading, setConfirmAlertModalLoading] =
    useState(false);
  // const [detail, setDetail] = useState("");
  const showAlertModal = () => {
    setOpenAlertModal(true);
  };
  const handleAlertModalOk = () => {
    setConfirmAlertModalLoading(true);
    setTimeout(() => {
      setOpenAlertModal(false);
      setConfirmAlertModalLoading(false);
    }, 2000);
  };
  const handleAlertModalCancel = () => {
    setOpenAlertModal(false);
    setOpenDocumentModal(true);
  };
  const [openDocumentModal, setOpenDocumentModal] = useState(false);
  const [confirmDocumentModalLoading, setConfirmDocumentModalLoading] =
    useState(false);
  // const [detail, setDetail] = useState("");
  const showDocumentModal = () => {
    setOpenDocumentModal(true);
  };
  const handleDocumentModalOk = () => {
    setConfirmDocumentModalLoading(true);
    setTimeout(() => {
      setOpenDocumentModal(false);
      setConfirmDocumentModalLoading(false);
    }, 2000);
  };
  const handleDocumentModalCancel = () => {
    setOpenDocumentModal(false);
    // setTimeout(handleCalculate, 2000);
  };
  return (
    <>
      <FormHeader label={"PAYMENT INFORMATION"}>
        <FormRadioButton options={paymentTypes} />
      </FormHeader>
      <AlertModal
        onOk={handleAlertModalOk}
        confirmLoading={confirmAlertModalLoading}
        open={openAlertModal}
        onCancel={handleAlertModalCancel}
      />
      <CustomerDocumentationModal
        onOk={handleDocumentModalOk}
        confirmLoading={confirmDocumentModalLoading}
        open={openDocumentModal}
        onCancel={handleDocumentModalCancel}
      />
      {/* <CustomerDocumentationModal
        onOk={handlePayeeModalOk}
        confirmLoading={confirmPayeeModalLoading}
        open={openPayeeModal}
        onCancel={handlePayeeModalCancel}
      /> */}
      <Row className="order-row">
        <Col span={24}>
          <OrderLabeledInput
            label="Payee"
            inputSpan={14}
            searchIcon={
              <SearchIcon
                onClick={() => {
                  if (!receiver) {
                    return;
                  }
                  showPayeeModal();
                }}
              />
            }
            className="payment-form-text-input"
            defaultValue={payment ? "ethiopia payee partner" : ""}
            disabled={true}
            style={{ color: "#000000" }}
          />
        </Col>
      </Row>

      <PayeeInformationModal
        onOk={handlePayeeModalOk}
        confirmLoading={confirmPayeeModalLoading}
        open={openPayeeModal}
        onCancel={handlePayeeModalCancel}
      />

      {/* <CustomerDocumentationModal
        onOk={handlePayeeModalOk}
        confirmLoading={confirmPayeeModalLoading}
        open={openPayeeModal}
        onCancel={handlePayeeModalCancel}
      /> */}

      <Row className="order-row">
        <Col span={24}>
          <OrderLabeledInput
            label="Mode of Pay."
            inputSpan={15}
            className="payment-form-text-input"
            InputComponent={() => (
              <Button
                className="grey-input-btn"
                style={{
                  textAlign: "left",
                }}
                // onClick={showPayeeModal}
              >
                {payment ? "BANK DEPOSIT" : ""}
              </Button>
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
            disabled={true}
            style={{ color: "#000000" }}
            value={
              payment
                ? `PC > ethiopia payee partner\ndemo payer address\n4444\nBANK > ${
                    payment.bank_name
                  }\nBranch > ${
                    payment.branch ? payment.branch : ""
                  }\nAccount Number > ${payment.bank_account}`
                : ""
            }
          />
        </Col>
      </Row>
      <Form form={form}>
        <Row className="order-row order-amount-row">
          <Col span={3}>
            <span className="app-text bold-title">I want</span>
          </Col>
          <Col span={7}>
            <FormDropDown
              name="calculation_option"
              options={calculation_option}
            />
          </Col>
          <Col span={7}>
            <FormHeaderInput
              rules={[
                {
                  required: true,
                  message: "",
                },
                {
                  pattern: new RegExp(/^\d+$/),
                  message: "",
                },
              ]}
              name="amount"
              label="Amount"
              inputSpan={24}
            />
          </Col>
          <Col span={5}>
            <FormDropDown name="moneyTypes" options={moneyTypes} />
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
                <Button
                  // disabled={true}

                  onClick={() => {
                    if (!payment) {
                      return;
                    }
                    if (!paymentInfo) {
                      return;
                    }
                    handleCalculate();
                  }}
                  className="green-btn"
                >
                  Calculate
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>

      <Row className="order-row ">
        <Col span={24}>
          <OrderLabeledInput
            className="white-input"
            label="Memo"
            inputSpan={17}
          />
        </Col>
      </Row>
      <Row className="order-row" style={{ padding: 14 }}></Row>
    </>
  );
};

export default PaymentInformationForm;
