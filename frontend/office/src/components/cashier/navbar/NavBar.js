import { Row, Col } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import LoggedInCashierInfo from "../transactions/LoggedInCashierInfo";
import { logoutApi } from "../../../store/auth";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NavBarToolTip, { NavBarToolTipItem } from "./NavBarToolTip";
import "../styles/NavBar.css";

const reportsToolTips = [
  <NavBarToolTipItem label={"Running Balance"} />,
  <NavBarToolTipItem label={"Currency Rates"} />,
  <NavBarToolTipItem label={"Point of Payments"} />,
  <NavBarToolTipItem label={"Invoice & Commission"} />,
  <NavBarToolTipItem label={"Branch Operation by User"} />,
  <Link to="/reports/user-report">
    <NavBarToolTipItem label={"User"} />
  </Link>,
  <NavBarToolTipItem label={"Transaction By Payment Type"} />,
  <NavBarToolTipItem label={"Haiti Reports"} />,
  <NavBarToolTipItem label={"Product List Report"} />,
];

const NavBar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutApi());
  };

  return (
    <div className="header">
      <div className="nav-container">
        <Row className="nav">
          <Link to="/">
            <span className="nav-item">Transactions</span> |
          </Link>
          <span className="nav-item">Services</span> |
          <div className="nav-item-container">
            <span className="nav-item">Reports</span>
            <NavBarToolTip header="Reports" toolTips={reportsToolTips} />
          </div>
          |<span className="nav-item">Tools</span> |
          <span className="nav-item">Payments</span>|
          <span className="nav-item">Dashboard</span> |
          <button
            className="nav-item transaction-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
          |
        </Row>
        <Row className="nav">
          <Col span={19}>
            <span className="nav-item">Worldwide Money Transfer System</span>
          </Col>
          <Col span={5} align="right">
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
