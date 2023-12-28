import { Row, Col } from "antd";
import FormHeader from "../../components/cashier/form/FormHeader";

import SenderInformationForm from "../../components/cashier/order/Forms/SenderInformationForm";
import ReceiverInformationForm from "../../components/cashier/order/Forms/ReceiverInformationForm";
import PaymentInformationForm from "../../components/cashier/order/Forms/PaymentInformationForm";
import TransactionInformationForm from "../../components/cashier/order/Forms/TransactionInformation";
import OrderHeader from "../../components/cashier/order/OrderHeader";
import { useParams } from "react-router-dom";
import { getTransactionById } from "../../store/transactions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getReceiverApiCall,
  getReceivers,
  setSender,
  setReceiver,
  getReceiver,
  getCommissionsTranApiCall,
  getAgencyApiCall,
  setTranRate,
  getAgency,
  getPayment,
  getPaymentInfo,
  setPayment,
} from "../../store/transactions";
const Order = () => {
  const dispatch = useDispatch();
  const { senderId } = useParams();
  const sender = useSelector((state) => getTransactionById(state, senderId));
  const receivers = useSelector((state) => getReceivers(state, senderId));
  const receiver = useSelector(getReceiver);
  const agency = useSelector(getAgency);

  useEffect(() => {
    if (agency) {
      dispatch(setTranRate(agency.default_rate));
      console.log("agency 1", agency);
    }
    dispatch(getReceiverApiCall({ sender: senderId }));
    dispatch(getCommissionsTranApiCall());
    dispatch(getAgencyApiCall());
  }, []);
  useEffect(() => {
    dispatch(setSender(sender));
    if (receivers.length > 0 && !receiver) dispatch(setReceiver(receivers[0]));
  }, [sender]);

  return (
    <>
      {sender ? (
        <div className="order-page">
          <OrderHeader />
          <SenderInformationForm sender={sender} />
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
      ) : (
        <div>
          <h1>404 Not Found</h1>
        </div>
      )}
    </>
  );
};

export default Order;
