import { Modal, Row, Col, Form } from "antd";
import FormHeader from "../../form/FormHeader";
import FormInput from "../../form/FormInput";
import AppPrimaryButton from "../../AppPrimaryButton";
import "../../styles/UpdateRate.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAgency,
  getTranRate,
  setTranRate,
} from "../../../../store/transactions";
import { useEffect } from "react";
const UpdateRate = ({ onCancel, OkBtn, ...otherProps }) => {
  const dispatch = useDispatch();
  const rate = useSelector(getTranRate);
  const [form] = Form.useForm();
  const agency = useSelector(getAgency);
  useEffect(() => {
    form.setFieldsValue({ rate, handling: 0 });
  }, [rate]);
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (
          agency &&
          agency.min_rate <= values.rate &&
          values.rate <= agency.max_rate
        ) {
          onCancel();
          dispatch(setTranRate(values.rate));
        }
      })
      .catch((err) => {});
  };
  return (
    <div>
      <Modal
        footer={(_, { OkBtn, CancelBtn }) => <></>}
        {...otherProps}
        className="order-modal update-rate-modal"
        closable={false}
        centered
      >
        <Form form={form}>
          <div className="order-modal-content">
            <FormHeader
              label={"Update Rate and/or Handling Amounts"}
              className="order-modal-header"
              titleSpan={24}
            />
            <Row align={"middle"} className="update-rate-input-row">
              <Col span={4}>
                <div>Rate</div>
              </Col>
              <Col>
                <FormInput name={"rate"} />
              </Col>
            </Row>
            <Row align={"middle"} className="update-rate-input-row">
              <Col span={4}>
                <div>Handling</div>
              </Col>
              <Col>
                <FormInput name="handling" />
              </Col>
            </Row>
            <Row className="update-rate-btns">
              <AppPrimaryButton
                onClick={handleOk}
                buttonClassName="update-btn-ok"
                label={"Ok"}
              />
              <AppPrimaryButton
                buttonClassName={"update-btn-cancel"}
                label={"Cancel"}
              />
            </Row>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateRate;
