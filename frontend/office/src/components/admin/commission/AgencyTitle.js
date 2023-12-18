import { Link, useParams } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { getAgency } from "../../../store/agency";

const AgencyTitle = () => {
  const { id } = useParams();
  const agency = useSelector((state) => getAgency(state, id));

  return (
    <div className="agency-title-container">
      <Link to="/">
        <span className="agency-title">
          <LeftOutlined />
          <span className="agency-name">{agency.name}</span>
        </span>
      </Link>
    </div>
  );
};

export default AgencyTitle;
