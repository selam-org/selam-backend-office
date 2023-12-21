import { CloseOutlined } from "@ant-design/icons";

const CloseOrderModalBtn = () => {
  return (
    <btn className="close-modal-btn">
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
