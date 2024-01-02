import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import { getLoggedinUser } from "../../../store/auth";

const LoggedInCashierInfo = () => {
  const user = useSelector(getLoggedinUser);

  return (
    <div className="user-info">
      <Row>
        <Col className="user-info-key" span={7}>
          User
        </Col>
        <Col className="user-info-value" span={17}>
          {user.full_name}
        </Col>
      </Row>
      <Row>
        <Col className="user-info-key second-cell" span={7}>
          Agency
        </Col>
        <Col className="user-info-value second-cell" span={17}>
          {user.agency_name}
        </Col>
      </Row>
    </div>
  );
};

export default LoggedInCashierInfo;
