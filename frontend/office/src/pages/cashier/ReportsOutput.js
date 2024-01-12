import { Col, Row } from "antd";
import "../styles/ReportsOutput.css";
import AgencyTable from "../../components/cashier/reports/AgencyTable";
import OrdersTable from "../../components/cashier/reports/OrdersTable";

const ReportsOutput = () => {
  return (
    <div className="output-content">
      <div className="output-header">
        <div className="output-left">
          <img src="/images/logo.png" alt="logo" className="output-logo-img" />
          <p className="output-agency output-agency-top">
            SE001 - Agency Saleemexpress
          </p>
          <p className="output-agency output-agency-bottom">
            From 1/1/2024 TO 1/1/2024
          </p>
          <div className="output-btns">
            <btn className="output-btn-green">EXPORT TO EXCEL</btn>
            <btn className="output-btn-red">BACK</btn>
          </div>
        </div>
        <div className="output-right">
          <p>8205 Fenton Street, Silver Spring, MD 20910</p>
          <p>CAP: 20910</p>
          <p>Tel: 2405312646</p>
          <p>FAX:nil</p>
        </div>
      </div>
      <OutputTableHeader
        date="1/1/2024"
        title="Ending Balance"
        amount="119,140,251.38"
      />
      <div className="report-output-table">
        <OrdersTable />
      </div>
      <OutputTableHeader
        date="1/1/2024"
        title="Beginning Balance"
        amount="119,044,709.72"
      />
    </div>
  );
};

const OutputTableHeader = ({ date, title, amount }) => {
  return (
    <div className="output-table-header">
      <div className="output-header-cell output-header-cell-first" span={4}>
        {date}
      </div>
      <div className="output-header-cell output-header-cell-second" span={3}>
        {title}
      </div>
      <div className="output-header-cell output-header-cell-third" span={17}>
        USD {amount}
      </div>
    </div>
  );
};

export default ReportsOutput;
