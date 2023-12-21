import { Modal, Row, Col } from "antd";
import FormHeader from "../../form/FormHeader";
import FormInput from "../../form/FormInput";
import AppPrimaryButton from "../../AppPrimaryButton";
import "../../styles/UpdateRate.css";

const UpdateRate = ({ onCancel, ...otherProps }) => {
  return (
    <div>
      <Modal
        footer={(_, { OkBtn, CancelBtn }) => <></>}
        {...otherProps}
        className="order-modal update-rate-modal"
        closable={false}
        centered
      >
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
              <FormInput />
            </Col>
          </Row>
          <Row align={"middle"} className="update-rate-input-row">
            <Col span={4}>
              <div>Handling</div>
            </Col>
            <Col>
              <FormInput />
            </Col>
          </Row>
          <Row className="update-rate-btns">
            <AppPrimaryButton buttonClassName="update-btn-ok" label={"Ok"} />
            <AppPrimaryButton
              buttonClassName={"update-btn-cancel"}
              label={"Cancel"}
            />
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateRate;
