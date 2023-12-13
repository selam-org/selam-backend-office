import PageTitle from "../../components/admin/PageTitle";
import { Link, useParams } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import CommissionForm from "../../components/admin/commission/CommissionForm";
import "../styles/Admin.css";
import "../styles/Commission.css";
import RateForm from "../../components/admin/commission/RateForm";

const Commission = () => {
  let { agencyId } = useParams();

  return (
    <>
      <AgencyTitle />
      <RateForm />
      <CommissionForm />
    </>
  );
};

const AgencyTitle = () => {
  return (
    <div className="agency-title-container">
      <Link to="/admin">
        <span className="agency-title">
          <LeftOutlined />
          <span className="agency-name">Silver Spring Office</span>
        </span>
      </Link>
    </div>
  );
};

const AdminButtonStyle = {
  margin: "0px 8px",
};

export default Commission;
