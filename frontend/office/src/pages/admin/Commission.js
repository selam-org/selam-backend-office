import AgencyTitle from "../../components/admin/commission/AgencyTitle";
import RateForm from "../../components/admin/commission/RateForm";
import CommissionForm from "../../components/admin/commission/CommissionForm";
import "../styles/Admin.css";
import "../styles/Commission.css";
import NewCommissionForm from "../../components/admin/commission/NewCommissionForm";

const Commission = () => {
  return (
    <>
      <AgencyTitle />
      <RateForm />
      <NewCommissionForm />
      <CommissionForm />
    </> 
  );
};

export default Commission;
