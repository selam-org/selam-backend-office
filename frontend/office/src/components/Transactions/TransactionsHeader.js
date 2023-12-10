import { Row, Col, Image, Select } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import UserInfo from "./UserInfo";
import "../../pages/styles/Transactions.css";

const TransactionsHeader = () => {
  return (
    <Row className="transactions-header">
      <Col span={18} className="transactions-nav-container">
        <Row className="transactions-nav">
          <span className="transaction-nav-item">Transactions</span> |
          <span className="transaction-nav-item">Services</span> |
          <span className="transaction-nav-item">Reports</span>|
          <span className="transaction-nav-item">Transactions</span> |
          <span className="transaction-nav-item">Tools</span> |
          <span className="transaction-nav-item">Payments</span>|
        </Row>
        <Row className="transactions-nav">
          <Col span={19}>
            <span className="transaction-nav-item">
              Worldwide Money Transfer System
            </span>
          </Col>
          <Col span={4} align="right">
            <LanguageDropDown />
          </Col>
        </Row>
      </Col>
      <Col span={2} align="center" className="logo">
        <Image src="/images/logo.png" width={80} alt="logo" />
      </Col>
      <UserInfo />
    </Row>
  );
};

const LanguageDropDown = () => {
  return (
    <div className="language-dropdown">
      <span className="language-dropdown-choice">English US</span>
      <span className="language-dropdown-icon-container">
        <CaretDownOutlined size={100} className="language-dropdown-icon" />
      </span>
    </div>
  );
};

export default TransactionsHeader;
