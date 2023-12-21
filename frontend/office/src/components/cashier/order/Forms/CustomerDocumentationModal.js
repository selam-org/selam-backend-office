import { Modal, Radio, Row, Table } from "antd";
import FormHeader from "../../form/FormHeader";
import CloseOrderModalBtn from "../CloseOrderModalBtn";
import AppPrimaryButton from "../../AppPrimaryButton";
import "../../styles/CustomerDocumentation.css";

const CustomerDocumentationModal = ({ onCancel, ...otherProps }) => {
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
          />
        </Row>
        <div className="document-table-info">
          Please select IDs and click the Close button
        </div>
        <DocumentationTable />
      </Modal>
    </div>
  );
};

const DocumentationTable = () => {
  const columns = [
    {
      title: "Default",
      dataIndex: "default",
      key: "default",
      render: (_, item, index) => (
        <>
          <Radio>Radio</Radio>
        </>
      ),
    },
    {
      title: "Select",
      dataIndex: "select",
      key: "select",
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
      dataIndex: "country",
      key: "country",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
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
    <Table className="document-table" columns={columns} pagination={false} />
  );
};

export default CustomerDocumentationModal;
