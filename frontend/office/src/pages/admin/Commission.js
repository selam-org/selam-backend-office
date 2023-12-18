import AgencyTitle from "../../components/admin/commission/AgencyTitle";
import RateForm from "../../components/admin/commission/RateForm";
import CommissionForm from "../../components/admin/commission/CommissionForm";
import "../styles/Admin.css";
import "../styles/Commission.css";

const Commission = () => {
  return (
    <>
      <AgencyTitle />
      <RateForm />
      <CommissionForm />
    </>
  );
};

export default Commission;
