import { Row, Col, Modal, Table } from "antd";
import FormHeader from "../../form/FormHeader";
import FormLabeledInput from "../../form/FormLabeledInput";
import FormDropdown from "../../form/FormDropdown";
import AppPrimaryButton from "../../AppPrimaryButton";
import { MinusOutlined } from "@ant-design/icons";
import "../../../../pages/styles/Order.css";
import SearchIcon from "../../SearchIcon";
import FormInput from "../../form/FormInput";

const PayeeInformationModal = ({ onCancel, ...otherProps }) => {
  return (
    <div className="payee-modal">
      <Modal
        style={{ padding: 0, borderRadius: 0, width: "70vw" }}
        footer={(_, { OkBtn, CancelBtn }) => <></>}
        {...otherProps}
        className="payee-modal"
        closable={false}
      >
        <div className="payee-modal-content">
          <FormHeader
            label={"Payee Information"}
            className="payee-info-header"
          />
          <div className="payee-info-form-box">
            <div className="payee-info-input-row">
              <Row gutter={10}>
                <Col span={8}>
                  <FormLabeledInput
                    className="payee-input"
                    InputComponent={FormDropdown}
                    label={"Mode of payment"}
                    colSpan={24}
                  />
                </Col>
                <Col span={8}>
                  <FormLabeledInput
                    className="payee-input"
                    InputComponent={FormDropdown}
                    label={"Sending Currency"}
                    colSpan={24}
                  />
                </Col>
                <Col span={8}>
                  <FormLabeledInput
                    className="payee-input"
                    InputComponent={FormDropdown}
                    label={"Delivery Currency"}
                    colSpan={24}
                  />
                </Col>
              </Row>
            </div>
            <div className="reload-btn">Reload</div>
            <PayeePartner />
            <Row className="payee-btn-container">
              <Col>
                <AppPrimaryButton buttonClassName="payee-btn" label={"Ok"} />
              </Col>
              <Col>
                <AppPrimaryButton
                  buttonClassName="payee-btn payee-cancel-btn"
                  label={"Cancel"}
                  onClick={onCancel}
                />
              </Col>
            </Row>
            <FormHeader
              label={"BANK ACCOUNT DETAILS"}
              className="payee-info-header bank-info-header"
            />
            <Row gutter={10}>
              <Col span={8}>
                <FormLabeledInput
                  labelClassName="bank-input-label"
                  className="payee-input"
                  InputComponent={FormDropdown}
                  label={"Bank"}
                  colSpan={24}
                />
              </Col>
              <Col span={8}>
                <FormLabeledInput
                  labelClassName="bank-input-label"
                  className="payee-input"
                  InputComponent={FormDropdown}
                  label={"Account Type"}
                  colSpan={24}
                />
              </Col>
              <Col span={8}>
                <FormLabeledInput
                  labelClassName="bank-input-label"
                  className="payee-input"
                  label={"Account Number"}
                  colSpan={24}
                />
              </Col>
            </Row>
            <Row gutter={10} align={"bottom"}>
              <Col span={8}>
                <FormLabeledInput
                  labelClassName="bank-input-label"
                  className="payee-input"
                  InputComponent={FormDropdown}
                  label={"Branch Name"}
                  colSpan={24}
                />
              </Col>
              <Col span={8}>
                <Row gutter={8}>
                  <Col>
                    <AppPrimaryButton label={"Add New"} />
                  </Col>
                  <Col>
                    <AppPrimaryButton label={"Save"} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <BankAccountsTable />
        </div>
      </Modal>
    </div>
  );
};

const PayeePartner = () => {
  return (
    <div className="payee-partner-box">
      <Row className="payee-partner-title-box" align={"middle"}>
        <Col>
          <div className="payee-icon-conainer">
            <MinusOutlined className="payee-icon" />
          </div>
        </Col>
        <Col className="partner-title">
          ethiopia payee partner [Rate : 114.5]
        </Col>
      </Row>
      <Row className="payee-partner-title-box" align={"top"}>
        <Col>
          <SearchIcon className="partner-search-icon" />
        </Col>
        <Col>
          <Col span={11}>
            <FormInput placeHolder={"Filter"} />
          </Col>
          <Row>
            <Col className="partner-o">&#x25CB;</Col>
            <Col>
              <span className="partner-address">
                {
                  " --- PC -> [Rate: 114.5] ethiopia payee partner ,... demo payer address"
                }
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

const BankAccountsTable = () => {
  const dataSource = [
    {
      key: "1",
      accountNumber: "1000331401319",
      bank: "Commercial Bank of Ethiopia",
      branchName: "Main Branch",
      accountType: "SAVINGS ACCOUNT",
    },
  ];

  const columns = [
    {
      title: "Account Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
    },
    {
      title: "Bank",
      dataIndex: "bank",
      key: "bank",
    },
    {
      title: "Branch Name",
      dataIndex: "branchName",
      key: "branchName",
    },
    {
      title: "Account Type",
      dataIndex: "accountType",
      key: "accountType",
    },
  ];

  return (
    <Table
      className="bank-accounts-table"
      dataSource={dataSource}
      columns={columns}
      pagination={false}
    />
  );
};

export default PayeeInformationModal;
