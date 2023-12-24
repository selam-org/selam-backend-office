import AgencyTitle from "../../components/admin/commission/AgencyTitle";
import RateForm from "../../components/admin/commission/RateForm";
import NewCommissionForm from "../../components/admin/commission/NewCommissionForm";
import CommissionForm from "../../components/admin/commission/CommissionForm";
import "../styles/Admin.css";
import "../styles/Commission.css";

const Commission = () => {
  return (
    <div className="commision-page">
      <AgencyTitle />
      <RateForm />
      <NewCommissionForm />
      <CommissionForm />
    </div>
  );
};

export default Commission;
