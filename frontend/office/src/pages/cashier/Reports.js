import { Col, Row } from "antd";
import NavBar from "../../components/cashier/NavBar";
import FormRadioButton from "../../components/cashier/form/FormRadioButton";
import FormDropDown from "../../components/cashier/form/FormDropdown";
import AgencyTable from "../../components/cashier/reports/AgencyTable";
import OrdersTable from "../../components/cashier/reports/OrdersTable";
import Footer from "../../components/cashier/Footer";
import CustomDatePicker from "../../components/cashier/DatePicker";
import "../styles/Reports.css";

const transactionTypes = [
  {
    value: "Debits",
    title: "Debits",
  },
  {
    value: "Credits",
    title: "Credits",
  },
  {
    value: "All",
    title: "All",
  },
];

const currencyTypes = [
  {
    value: "Dollar",
    title: "Dollar",
  },
];

const recordPerPageOptions = [
  {
    value: 20,
    title: 20,
  },
];

const Reports = () => {
  return (
    <>
      <NavBar />
      <div className="report-content">
        <div className="cashier-page-title">Running Balance</div>
        <div className="report-box">
          <div className="report-box-title">SE001-Agency Saleemexpress</div>
          <Row className="report-params" align={"middle"}>
            <p className="app-text date-title">DATE</p>
            <div className="report-date-picker">
              <CustomDatePicker />
            </div>
            <div className="report-date-picker">
              <CustomDatePicker />
            </div>
            <p className="app-text date-format">mm/dd/yy</p>
            <FormRadioButton options={transactionTypes} />
            <FormDropDown options={currencyTypes} defaultValue={"Dollar"} />
          </Row>
          <Row className="report-btns">
            <btn className="report-btn report-btn-green">VIEW STATEMENT</btn>
            <btn className="report-btn report-btn-blue">SEARCH</btn>
            <btn className="report-btn report-btn-red">CLOSE</btn>
          </Row>
          <AgencyTable />
          <Row align={"middle"} className="ending-balance">
            <Col span={4}>1/1/2024</Col>
            <Col span={20}>
              <div className="ending-balance-title">Ending Balance: USD</div>
              <div>119,140,251.38</div>
            </Col>
          </Row>
          <OrdersTable />
          <Row align={"middle"} className="ending-balance  ">
            <Col span={4}>1/1/2024</Col>
            <Col span={20}>
              <div className="ending-balance-title">Ending Balance: USD</div>
              <div>119,140,251.38</div>
            </Col>
          </Row>
          <div style={{ height: "20px" }}></div>
          <Row className="page-btns ">
            <btn className="page-btn">PREVIOUS</btn>
            <btn className="page-btn">NEXT</btn>
          </Row>
          <Row align={"middle"} className="page-info">
            <Col span={8}>Total Records Found : 170</Col>
            <Col span={8}>
              <Row align={"middle"}>
                Show
                <span className="page-dropdown">
                  <FormDropDown
                    options={recordPerPageOptions}
                    defaultValue={20}
                  />
                </span>
                Records Per Page
              </Row>
            </Col>
            <Col span={8}>Displaying Page 1 of 9</Col>
          </Row>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Reports;
