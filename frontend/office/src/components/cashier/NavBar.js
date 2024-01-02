import { Row, Col } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import LoggedInCashierInfo from "./transactions/LoggedInCashierInfo";
import { logoutApi } from "../../store/auth";
import { useDispatch } from "react-redux";
import "../../../pages/styles/Transactions.css";
import Reports from "./../Reports";
import { Link } from "react-router-dom";
import "../../pages/styles/Transactions.css";

const NavBar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutApi());
  };

  return (
    <div className="nav-container">
      <div className="transactions-nav-container">
        <Row className="transactions-nav">
          <Link to="/">
            <span className="transaction-nav-item">Transactions</span> |
          </Link>
          <span className="transaction-nav-item">Services</span> |
          <span className="transaction-nav-item">Reports</span>|
          <span className="transaction-nav-item">
            <Reports />
          </span>
          |<span className="transaction-nav-item">Transactions</span> |
          <span className="transaction-nav-item">Tools</span> |
          <span className="transaction-nav-item">Payments</span>|
          <span className="transaction-nav-item">Dashboard</span> |
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
      </div>
      <div span={2} align="center" className="logo">
        <img src="/images/logo.png" alt="logo" className="logo-img" />
      </div>
      <LoggedInCashierInfo />
    </div>
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

export default NavBar;
