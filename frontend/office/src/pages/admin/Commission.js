import AgencyTitle from "../../components/admin/commission/AgencyTitle";
import RateForm from "../../components/admin/commission/RateForm";
import NewCommissionForm from "../../components/admin/commission/NewCommissionForm";
import CommissionForm from "../../components/admin/commission/CommissionForm";
import { useSelector } from "react-redux";
import { getAgency } from "../../store/agency";
import { useParams } from "react-router-dom";

import "../styles/Admin.css";
import "../styles/Commission.css";

const Commission = () => {
  const { id } = useParams();
  const agency = useSelector((state) => getAgency(state, id));

  return agency ? (
    <div className="commision-page">
      <AgencyTitle />
      <RateForm />
      <NewCommissionForm />
      <CommissionForm />
    </div>
  ) : (
    <h1>Agency not found</h1>
  );
};

export default Commission;
