import { Row, Col, Modal, Table, Form } from "antd";
import FormHeader from "../../form/FormHeader";
import FormLabeledInput from "../../form/FormLabeledInput";
import FormDropdown from "../../form/FormDropdown";
import AppPrimaryButton from "../../AppPrimaryButton";
import { MinusOutlined } from "@ant-design/icons";
import "../../../../pages/styles/Order.css";
import SearchIcon from "../../SearchIcon";
import FormInput from "../../form/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  getReceiver,
  getPaymentApiCall,
  getPaymentInfo,
  getPaymentError,
  getPaymentLoading,
  getPayment,
  setPayment,
  updatePaymentInfoApiCall,
  getUpdatePaymentInfoError,
  getUpdatePaymentInfoLoading,
  addPaymentInfoApiCall,
} from "../../../../store/transactions";
import { useEffect } from "react";

const PayeeInformationModal = ({ onCancel, ...otherProps }) => {
  const [selectedRowKey, setSelectedRowKey] = useState();
  const dispatch = useDispatch();
  const receiver = useSelector(getReceiver);
  const paymentInfo = useSelector(getPaymentInfo);
  const paymentError = useSelector(getPaymentError);
  const paymentLoading = useSelector(getPaymentLoading);
  const payment = useSelector(getPayment);
  const updatePaymentInfoError = useSelector(getUpdatePaymentInfoError);
  const updatePaymentInfoLoading = useSelector(getUpdatePaymentInfoLoading);
  console.log(payment, "paymentOb");
  const [form] = Form.useForm();
  useEffect(() => {
    if (receiver) {
      dispatch(getPaymentApiCall({ receiver: receiver.id }));
    }
  }, [receiver]);
  useEffect(() => {
    form.setFieldsValue(payment);
    if (!payment) {
      form.resetFields();
    }
    setSelectedRowKey(payment?.id);
  }, [payment]);
  console.log(paymentInfo, "paymentInfo");
  const banks = [
    {
      title: "Bank of Abyssinia",
      value: "Bank of Abyssinia",
    },
    {
      title: "Commercial Bank of Ethiopia",
      value: "Commercial Bank of Ethiopia",
    },
    {
      title: "Dashen Bank",
      value: "Dashen Bank",
    },
    {
      title: "Wegagen Bank",
      value: "Wegagen Bank",
    },
    {
      title: "Awash Bank",
      value: "Awash Bank",
    },
    {
      title: "NIB Bank",
      value: "NIB Bank",
    },
    {
      title: "United Bank",
      value: "United Bank",
    },
    {
      title: "Oromia International Bank",
      value: "Oromia International Bank",
    },
    {
      title: "Cooperative Bank of Oromia",
      value: "Cooperative Bank of Oromia",
    },
  ];
  const account_types = [
    {
      title: "SAVINGS ACCOUNT",
      value: "SAVINGS ACCOUNT",
    },
    {
      title: "CHECKING ACCOUNT",
      value: "CHECKING ACCOUNT",
    },
  ];
  

  const handleOk = () => {
    // console.log("ok");
    const py = paymentInfo.find((p) => p.id === selectedRowKey);
    console.log(py, "py");
    if (py) {
      dispatch(setPayment(py));
      if (onCancel) {
        onCancel();
      }
    }
  };
  const handleCancel = () => {
    setSelectedRowKey(payment?.id);
    console.log("cancel", payment, payment?.id, selectedRowKey, "cancel");
    if (onCancel) {
      onCancel();
    }
  };
  const handleSave = () => {
    console.log("save payment");
    form
      .validateFields()
      .then((values) => {
        console.log(values, "payment values");
        if (payment) {
          dispatch(updatePaymentInfoApiCall(values, payment.id));
        } else {
          dispatch(
            addPaymentInfoApiCall({
              ...values,
              receiver: receiver.id,
              mode_pay_receiver: "BANK DEPOSIT",
              point_of_payment: "ethiopia payee partner",
            })
          );
        }
      })
      .catch((err) => {
        console.log(err, "err");
        console.log("error");
      });
  };
  return (
    <div className="payee-modal">
      <Modal
        style={{ padding: 0, borderRadius: 0, width: "70vw" }}
        footer={(_, { OkBtn, CancelBtn }) => <></>}
        {...otherProps}
        className="order-modal payee-modal"
        closable={false}
      >
        <div className="order-modal-content">
          <FormHeader
            label={"Payee Information"}
            className="order-modal-header"
          />
          <div className="payee-info-form-box">
            <div className="payee-info-input-row">
              <Row gutter={10}>
                <Col span={8}>
                  <FormLabeledInput
                    className="payee-input"
                    InputComponent={FormDropdown}
                    label={"Mode of payment"}
                    colSpan={24}
                    
                  />
                </Col>
                <Col span={8}>
                  <FormLabeledInput
                    className="payee-input"
                    InputComponent={FormDropdown}
                    label={"Sending Currency"}
                    colSpan={24}
                  />
                </Col>
                <Col span={8}>
                  <FormLabeledInput
                    className="payee-input"
                    InputComponent={FormDropdown}
                    label={"Delivery Currency"}
                    colSpan={24}
                  />
                </Col>
              </Row>
            </div>
            <div className="reload-btn">Reload</div>
            <PayeePartner />
            <Row className="payee-btn-container">
              <Col>
                <AppPrimaryButton
                  onClick={handleOk}
                  buttonClassName="payee-btn"
                  label={"Ok"}
                />
              </Col>
              <Col>
                <AppPrimaryButton
                  buttonClassName="payee-btn payee-cancel-btn"
                  label={"Cancel"}
                  onClick={handleCancel}
                />
              </Col>
            </Row>
            <FormHeader
              label={"BANK ACCOUNT DETAILS"}
              className="order-modal-header bank-info-header"
            />
            <Form form={form}>
              <Row gutter={10}>
                <Col span={8}>
                  <FormLabeledInput
                    labelClassName="bank-input-label"
                    className="payee-input"
                    InputComponent={FormDropdown}
                    label={"Bank"}
                    name="bank_name"
                    colSpan={24}
                    options={banks}
                    rules={[{ required: true, message: "" }]}
                  />
                </Col>
                <Col span={8}>
                  <FormLabeledInput
                    labelClassName="bank-input-label"
                    className="payee-input"
                    InputComponent={FormDropdown}
                    label={"Account Type"}
                    colSpan={24}
                    name="account_type"
                    options={account_types}
                    rules={[{ required: true, message: "" }]}
                  />
                </Col>
                <Col span={8}>
                  <FormLabeledInput
                    labelClassName="bank-input-label"
                    className="payee-input"
                    label={"Account Number"}
                    colSpan={24}
                    name="bank_account"
                  />
                </Col>
              </Row>
              <Row gutter={10} align={"bottom"}>
                <Col span={8}>
                  <FormLabeledInput
                    labelClassName="bank-input-label"
                    className="payee-input"
                    label={"Branch Name"}
                    colSpan={24}
                    name="branch"
                  />
                </Col>
                <Col span={8}>
                  <Row gutter={8}>
                    <Col>
                      <AppPrimaryButton
                        onClick={() => {
                          dispatch(setPayment(null));
                        }}
                        label={"Add New"}
                      />
                    </Col>
                    <Col>
                      <AppPrimaryButton onClick={handleSave} label={"Save"} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </div>

          <BankAccountsTable
            selectedRowKey={selectedRowKey}
            setSelectedRowKey={setSelectedRowKey}
          />
        </div>
      </Modal>
    </div>
  );
};

const PayeePartner = () => {
  return (
    <div className="payee-partner-box">
      <Row className="payee-partner-title-box" align={"middle"}>
        <Col>
          <div className="payee-icon-conainer">
            <MinusOutlined className="payee-icon" />
          </div>
        </Col>
        <Col className="partner-title">
          ethiopia payee partner [Rate : 114.5]
        </Col>
      </Row>
      <Row className="payee-partner-title-box" align={"top"}>
        <Col>
          <SearchIcon className="partner-search-icon" />
        </Col>
        <Col>
          <Col span={11}>
            <FormInput placeHolder={"Filter"} />
          </Col>
          <Row>
            <Col className="partner-o">&#x25CB;</Col>
            <Col>
              <span className="partner-address">
                {
                  " --- PC -> [Rate: 114.5] ethiopia payee partner ,... demo payer address"
                }
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

const BankAccountsTable = (props) => {
  const { setSelectedRowKey, selectedRowKey } = props;
  const paymentInfos = useSelector(getPaymentInfo);
  const onRow = (record) => {
    return {
      onClick: () => {
        // Toggle selection: if the row is already selected, deselect it, otherwise select it
        console.log(record.id, "record key");
        setSelectedRowKey(record.id);
      },
      // Apply the style conditionally
      style:
        selectedRowKey === record.id
          ? { background: "blue" }
          : { background: "white" },
    };
  };
  useEffect(() => {}, [selectedRowKey]);
  const columns = [
    {
      title: "Account Number",
      dataIndex: "bank_account",
      key: "bank_account",
    },
    {
      title: "Bank",
      dataIndex: "bank_name",
      key: "bank_name",
    },
    {
      title: "Branch Name",
      dataIndex: "branch",
      key: "branch",
    },
    {
      title: "Account Type",
      dataIndex: "account_type",
      key: "account_type",
    },
  ];

  return (
    <Table
      className="bank-accounts-table"
      dataSource={paymentInfos}
      columns={columns}
      pagination={false}
      onRow={onRow}
    />
  );
};

export default PayeeInformationModal;
