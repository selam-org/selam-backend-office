import { Col, Form, Modal, Row } from "antd";
import FormHeader from "../../form/FormHeader";
import FormInput from "../../form/FormInput";
import "../../styles/CashManagement.css";
import AppPrimaryButton from "../../AppPrimaryButton";
import CloseOrderModalBtn from "../CloseOrderModalBtn";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrderApiCall,
  getOrderError,
  getOrderLoading,
} from "../../../../store/transactions";
import {
  getTransInfo,
  getTransactionById,
  getReceiver,
  getPayment,
  getIsCalculated,
  getAgency,
  getTranRate,
  getIsOrderSuccess,
  setPayment,
  setTransInfo,
  setIsOrderSuccess,
  setTransaction,
  setTranRate,
  getOrder,
} from "../../../../store/transactions";
import { useParams, useNavigate } from "react-router-dom";
const CashManagementModal = ({ onCancel, ...otherProps }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { senderId } = useParams();
  const transInfo = useSelector(getTransInfo);
  const payment = useSelector(getPayment);
  const isCalculate = useSelector(getIsCalculated);
  const receiver = useSelector(getReceiver);
  const sender = useSelector((state) => getTransactionById(state, senderId));
  const rate = useSelector(getTranRate);
  const loading = useSelector(getOrderLoading);
  const errors = useSelector(getOrderError);
  const agency = useSelector(getAgency);
  const isOrderSuccess = useSelector(getIsOrderSuccess);
  const order = useSelector(getOrder);
  const [form] = Form.useForm();
  form.setFieldsValue({
    ...transInfo,
    customer_pay: 0,
    agent_returns: 0,
  });
  const handleOk = () => {
    console.log("handleOK");
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        dispatch(
          addOrderApiCall({
            invoice_number: "string",
            confirmation_no: "string",
            date: "2023-12-27",
            sender_currency: "Dollar",
            received_currency: "Ethiopian Birr",
            rate_change_receiver: transInfo.rate
              ? parseFloat(transInfo.rate).toFixed(2)
              : transInfo.rate,

            net_amount_receiver: transInfo.sent,
            fee: transInfo.fee,
            payment_type: "cash",
            total_pay_receiver: transInfo.receive,
            agency: agency.id,
            sender: sender.id,
            receiver: receiver.id,
            payment_info: payment.id,
          })
        );
        if (isOrderSuccess && order) {
          console.log("order success", order);
          dispatch(setIsOrderSuccess(false));
          onCancel();
          navigate("/");
          setTranRate(agency.default_rate);
          setTransInfo(null);
          setPayment(null);

          setTransaction({});
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Modal
        footer={(_, { OkBtn, CancelBtn }) => <></>}
        {...otherProps}
        className="order-modal cash-mgt-modal"
        closable={false}
        centered
      >
        <Form form={form}>
          <div className="order-modal-content">
            <div className="alert-header-container">
              <FormHeader
                label={"Cash Management"}
                className="order-modal-header"
              />
              <CloseOrderModalBtn onCancel={onCancel} />
            </div>
            <div>
              <Row className="modal-underline-row first-row" align={"middle"}>
                <Col span={8}> </Col>
                <Col span={8} className="cash-labels">
                  Amount(USD)
                </Col>
              </Row>
              <Row className="modal-underline-row" align={"middle"}>
                <Col span={8} className="cash-labels">
                  Total to pay
                </Col>
                <Col span={8}>
                  <FormInput
                    rules={[{ required: true, message: "" }]}
                    name="total"
                    style={{
                      color: "black",
                    }}
                  />
                </Col>
              </Row>
              <Row className="modal-underline-row" align={"middle"}>
                <Col span={8} className="cash-labels">
                  Customer Pays
                </Col>
                <Col span={8}>
                  <FormInput
                    rules={[{ required: true, message: "" }]}
                    name="customer_pay"
                    style={{
                      color: "black",
                    }}
                  />
                </Col>
              </Row>
              <Row className="modal-underline-row" align={"middle"}>
                <Col span={8} className="cash-labels">
                  Agent Returns
                </Col>
                <Col span={8}>
                  <FormInput
                    rules={[{ required: true, message: "" }]}
                    name="agent_returns"
                    style={{
                      color: "black",
                    }}
                  />
                </Col>
              </Row>
              <Row className="modal-underline-row last-row" align={"middle"}>
                <Col span={8}> </Col>
                <Col span={14}>
                  <Row className="cash-mgt-btns">
                    <AppPrimaryButton
                      disabled={loading}
                      loading={loading}
                      buttonClassName="cash-mgt-ok"
                      label={"Ok"}
                      onClick={() => {
                        console.log("hi process");
                        handleOk();
                      }}
                    />
                    <AppPrimaryButton
                      buttonClassName="cash-mgt-cancel"
                      label={"Cancel"}
                      onClick={() => {
                        onCancel();
                      }}
                    />
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CashManagementModal;
