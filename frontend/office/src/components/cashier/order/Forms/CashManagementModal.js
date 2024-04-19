import { Col, Form, Modal, Row } from "antd";
import FormHeader from "../../form/FormHeader";
import FormInput from "../../form/FormInput";
import "../../styles/CashManagement.css";
import AppPrimaryButton from "../../AppPrimaryButton";
import CloseOrderModalBtn from "../CloseOrderModalBtn";
import { useDispatch, useSelector } from "react-redux";
import html2pdf from "html2pdf.js";
import React, { useEffect } from "react";
import Receipt from "../Receipt";
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
  setOrderNull,
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
  const [localLoading, setLocalLoading] = React.useState(false);
  const openPDFInNewTab = () => {
    const element = document.getElementById("receipt-content");
    const pdfWidth = 76;
    const pdfHeight = 785;

    const opt = {
      margin: 0,
      filename: "receipt.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 7 },
      jsPDF: {
        unit: "mm",
        orientation: "portrait",
        format: [pdfWidth, pdfHeight],
      },
    };

    const pages = [element];
    let doc = html2pdf().set(opt).from(pages[0]).toPdf();
    for (let j = 1; j < pages.length; j++) {
      doc = doc
        .get("pdf")
        .then((pdf) => {
          pdf.addPage();
        })
        .from(pages[j])
        .toContainer()
        .toCanvas()
        .toPdf();
    }

    doc.get("pdf").then(function (pdf) {
      window.open(pdf.output("bloburl"), "_blank");
    });
  };
  useEffect(() => {
    if (getIsOrderSuccess && order) {
      openPDFInNewTab();
      dispatch(setOrderNull(null));
      console.log("order success", order);
      dispatch(setIsOrderSuccess(false));
      dispatch(setTranRate(agency.default_rate));
      dispatch(setTransInfo(null));
      dispatch(setPayment(null));
      dispatch(setTransaction(null));
      onCancel();
      navigate("/");
      setLocalLoading(false);
    }
  }, [errors, isOrderSuccess, order]);
  const handleOk = () => {
    console.log("handleOK");
    function getCurrentDate() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is zero-based
      const day = String(now.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    }
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        setLocalLoading(true);
        dispatch(
          addOrderApiCall({
            invoice_number: "string",
            confirmation_no: "string",
            date: getCurrentDate(),
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

        // setTimeout(() => {
        //   // console.log(order, isOrderSuccess, "order isOrder");
        //   if (isOrderSuccess && order) {
        //     dispatch(setOrderNull(null));
        //     console.log("order success", order);
        //     dispatch(setIsOrderSuccess(false));
        //     dispatch(setTranRate(agency.default_rate));
        //     dispatch(setTransInfo(null));
        //     dispatch(setPayment(null));
        //     dispatch(setTransaction(null));
        //     openPDFInNewTab();
        //     onCancel();
        //     navigate("/");
        //     setLocalLoading(false);
        //   }
        // }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setLocalLoading(false);
      });
  };
  return (
    <div>
      <Receipt />
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
