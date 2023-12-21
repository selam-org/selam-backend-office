import { Modal } from "antd";
import FormHeader from "../../form/FormHeader";
import CloseOrderModalBtn from "../CloseOrderModalBtn";

const AlertModal = ({ onCancel, ...otherProps }) => {
  return (
    <div>
      <Modal
        footer={(_, { OkBtn, CancelBtn }) => <></>}
        {...otherProps}
        className="order-modal alert-modal"
        closable={false}
        centered
      >
        <div className="order-modal-content">
          <div className="alert-header-container">
            <FormHeader
              label={"Alert Message"}
              className="order-modal-header"
            />
            <CloseOrderModalBtn />
          </div>
          <div
            style={{
              margin: 0,
              color: "red",
              fontWeight: 600,
            }}
          >
            Please provide atleast one ID from the following:
          </div>
          <div className="identification-section">
            <p className="identification-option">1.Alien Card</p>
            <p className="identification-option">2.Driver License</p>
            <p className="identification-option">3.PASSPORT</p>
            <p className="identification-option">4.Student Card</p>
          </div>
        </div>
        <div className="alert-info" style={{ marginLeft: 2 }}>
          Please provide 1 identification to complete the transaction
        </div>
      </Modal>
    </div>
  );
};

export default AlertModal;
