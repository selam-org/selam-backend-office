import { Modal, Radio, Row, Table, Checkbox } from "antd";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTransactionById } from "../../../../store/transactions";
import { useState } from "react";
import FormHeader from "../../form/FormHeader";
import CloseOrderModalBtn from "../CloseOrderModalBtn";
import AppPrimaryButton from "../../AppPrimaryButton";
import "../../styles/CustomerDocumentation.css";

const CustomerDocumentationModal = ({ onCancel, ...otherProps }) => {
  const [isRadioSelected, setIsRadioSelected] = useState(false);

  const onRadioChange = (e) => {
    setIsRadioSelected(e.target.checked);
  };

  const handleOnCancel = () => {
    if (isRadioSelected) {
      console.log("Radio button is selected");
      onCancel();
    } else {
      console.log("Radio button is not selected");
    }
  };
  return (
    <div>
      <Modal
        footer={(_, { OkBtn, CancelBtn }) => <></>}
        {...otherProps}
        className="order-modal document-modal"
        closable={false}
        centered
      >
        <div className="order-modal-content">
          <div className="alert-header-container">
            <FormHeader
              label={"Customer Documentation"}
              className="order-modal-header"
            />
            <CloseOrderModalBtn />
          </div>
        </div>
        <Row className="document-btns">
          <AppPrimaryButton
            buttonClassName={"document-ok-btn"}
            label={"Add New"}
          />
          <AppPrimaryButton
            buttonClassName={"document-cancel-btn"}
            label={"Close"}
            onClick={handleOnCancel}
          />
        </Row>
        <div className="document-table-info">
          Please select IDs and click the Close button
        </div>
        <DocumentationTable onRadioChange={onRadioChange} />
      </Modal>
    </div>
  );
};

const DocumentationTable = ({ onRadioChange, ...otherProps }) => {
  const { senderId } = useParams();
  const sender = useSelector((state) => getTransactionById(state, senderId));
  let currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() + 1);
  let month = currentDate.getMonth() + 1; // Months are zero-indexed
  let day = currentDate.getDate();
  let year = currentDate.getFullYear();

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;

  let formattedDate = month + "/" + day + "/" + year;

  console.log(sender, "senderDocument");

  const columns = [
    {
      title: "Default",
      dataIndex: "default",
      key: "default",
      render: (_, item, index) => (
        <>
          <Radio onChange={onRadioChange}></Radio>
        </>
      ),
    },
    {
      title: "Select",
      dataIndex: "select",
      key: "select",
      render: (_, item, index) => (
        <>
          <Checkbox disabled={true}>Checkbox</Checkbox>;
        </>
      ),
    },
    {
      title: "ID ",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Type",
      dataIndex: "account_type",
      key: "account_type",
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Country",
      dataIndex: "sender_country",
      key: "sender_country",
    },
    {
      title: "State",
      dataIndex: "sender_state",
      key: "sender_state",
    },
    {
      title: "City",
      dataIndex: "sender_city",
      key: "sender_city",
    },
    {
      title: "Issue Date",
      dataIndex: "issue_date",
      key: "issue_date",
    },
    {
      title: "Expiration Date",
      dataIndex: "expiration_date",
      key: "expiration_date",
    },
    {
      title: "Issued Authority",
      dataIndex: "issued_authority",
      key: "issued_authority",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
  ];

  return (
    <Table
      dataSource={[{ ...sender, expiration_date: formattedDate }]}
      className="document-table"
      columns={columns}
      pagination={false}
    />
  );
};

export default CustomerDocumentationModal;
