import CustomDatePicker from "../../components/cashier/DatePicker";
import FormDropdown from "../../components/cashier/form/FormDropdown";
import FormRadioButton from "../../components/cashier/form/FormRadioButton";
import NavBar from "../../components/cashier/navbar/NavBar";
import Footer from "../../components/cashier/Footer";
import "../styles/UserReport.css";

const agencyOptions = [
  {
    value: "se001",
    title: "Agency Saleemexpress-SE001",
  },
];

const userOptions = [
  {
    value: "All Users",
    title: "All Users",
  },
  {
    value: "just_me",
    title: "Just me",
  },
];

const layoutTypes = [
  {
    value: "layout1",
    title: "Layout1",
  },
  {
    value: "layout2",
    title: "Layout2",
  },
];

const UserReport = () => {
  return (
    <>
      <NavBar />
      <div className="cashier-page-title user-report-title">User Report</div>
      <div className="user-report-form">
        <div className="user-report-form-title">User Report</div>
        <div className="user-report-row">
          <div className="user-report-row-title">Select Agency :</div>
          <div className="user-report-row-input agency-report-dropdown">
            <FormDropdown options={agencyOptions} defaultValue={"se001"} />
          </div>
        </div>
        <div className="user-report-row user-report-row-even">
          <div className="user-report-row-title">Select User :</div>
          <div className="user-report-row-input user-report-dropdown">
            <FormDropdown options={userOptions} defaultValue={"All Users"} />
          </div>
        </div>
        <div className="user-report-row">
          <div className="user-report-row-title">Date Range(From/To) :</div>
          <div className="user-report-row-input user-report-dates">
            <div className="start">
              <CustomDatePicker />
            </div>
            <CustomDatePicker />
            <span className="date-format">(mm/dd/yy)</span>
          </div>
        </div>
        <div className="user-report-row user-report-row-even">
          <div className="user-report-row-title">Choose Layout :</div>
          <div className="user-report-row-input user-report-dates">
            <div className="layout-types">
              <FormRadioButton options={layoutTypes} defaultValue={"layout1"} />
            </div>
          </div>
        </div>
        <div className="user-report-row user-report-row-last">
          <btn className="user-report-btn btn-green">GENERATE REPORT</btn>
          <btn className="user-report-btn btn-red">CLOSE</btn>
        </div>
      </div>
      <div className="user-report-footer">
        <Footer />
      </div>
    </>
  );
};

export default UserReport;
