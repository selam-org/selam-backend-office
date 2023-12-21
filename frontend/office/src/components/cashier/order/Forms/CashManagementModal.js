import { Col, Modal, Row } from "antd";
import FormHeader from "../../form/FormHeader";
import FormInput from "../../form/FormInput";
import "../../styles/CashManagement.css";
import AppPrimaryButton from "../../AppPrimaryButton";
import CloseOrderModalBtn from "../CloseOrderModalBtn";

const CashManagementModal = ({ onCancel, ...otherProps }) => {
  return (
    <div>
      <Modal
        footer={(_, { OkBtn, CancelBtn }) => <></>}
        {...otherProps}
        className="order-modal cash-mgt-modal"
        closable={false}
        centered
      >
        <div className="order-modal-content">
          <div className="alert-header-container">
            <FormHeader
              label={"Cash Management"}
              className="order-modal-header"
            />
            <CloseOrderModalBtn />
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
                <FormInput />
              </Col>
            </Row>
            <Row className="modal-underline-row" align={"middle"}>
              <Col span={8} className="cash-labels">
                Customer Pays
              </Col>
              <Col span={8}>
                <FormInput />
              </Col>
            </Row>
            <Row className="modal-underline-row" align={"middle"}>
              <Col span={8} className="cash-labels">
                Agent Returns
              </Col>
              <Col span={8}>
                <FormInput />
              </Col>
            </Row>
            <Row className="modal-underline-row last-row" align={"middle"}>
              <Col span={8}> </Col>
              <Col span={14}>
                <Row className="cash-mgt-btns">
                  <AppPrimaryButton
                    buttonClassName="cash-mgt-ok"
                    label={"Ok"}
                  />
                  <AppPrimaryButton
                    buttonClassName="cash-mgt-cancel"
                    label={"Cancel"}
                  />
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CashManagementModal;
