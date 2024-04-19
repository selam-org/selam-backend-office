import { Row, Col } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import LoggedInCashierInfo from "./LoggedInCashierInfo";
import { logoutApi } from "../../../store/auth";
import { useDispatch } from "react-redux";
import "../../../pages/styles/Transactions.css";
import Reports from "./../Reports";
const TransactionsHeader = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutApi());
  };

  return (
    <Row className="transactions-header">
      <Col span={18} className="transactions-nav-container">
        <Row className="transactions-nav">
          <span className="transaction-nav-item">Transactions</span> |
          <span className="transaction-nav-item">Services</span> |
          <span className="transaction-nav-item">Reports</span>|
          <span className="transaction-nav-item">
            <Reports />
          </span>
          |<span className="transaction-nav-item">Transactions</span> |
          <span className="transaction-nav-item">Tools</span> |
          <span className="transaction-nav-item">Payments</span>|
          <button
            className="transaction-nav-item transaction-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
          |
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
        <img src="/images/logo.png" width={80} alt="logo" />
      </Col>
      <LoggedInCashierInfo />
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
