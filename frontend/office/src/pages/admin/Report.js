import { useState } from "react";
import { DatePicker, Row } from "antd";
import AdminButton from "../../components/admin/AdminButton";
import "../styles/Admin.css";
import "../styles/Report.css";

const { RangePicker } = DatePicker;

const Report = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const isGenerateButtonDisabled = startDate == null || endDate == null;

  const handleDateChange = (dates) => {
    const startDate = dates[0] ? dates[0].format("YYYY-MM-DD") : null;
    const endDate = dates[1] ? dates[1].format("YYYY-MM-DD") : null;
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleGenerate = () => {
    console.log(startDate, endDate);
  };

  return (
    <>
      <div className="page-title">Report</div>
      <Row className="report-form" align={"middle"}>
        <RangePicker onChange={handleDateChange} className="date-picker" />
        <AdminButton
          label={"Generate"}
          className={"generate-btn"}
          disabled={isGenerateButtonDisabled}
          onClick={handleGenerate}
        />
      </Row>
      <a
        href="https://www.google.com"
        target="_blank"
        rel="noreferrer"
        className="report-link"
      >
        Click here to download the report
      </a>
    </>
  );
};

export default Report;
