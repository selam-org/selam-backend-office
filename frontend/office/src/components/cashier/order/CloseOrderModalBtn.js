import { CloseOutlined } from "@ant-design/icons";

const CloseOrderModalBtn = (props) => {
  const { onCancel } = props;
  return (
    <btn
      className="close-modal-btn"
      onClick={() => {
        console.log("closealert");
        if (onCancel) {
          onCancel();
        }
      }}
    >
      <CloseOutlined
        style={{
          stroke: "black",
          strokeWidth: "190",
          fontSize: "11px",
        }}
      />
    </btn>
  );
};

export default CloseOrderModalBtn;
