import { Col, Row } from "antd";

const UserInfo = () => {
  return (
    <Col span={4} className="user-info">
      <Row>
        <Col className="user-info-key" span={7}>
          User
        </Col>
        <Col className="user-info-value" span={17}>
          Fereja Mohammed
        </Col>
      </Row>
      <Row>
        <Col className="user-info-key" span={7}>
          Agency
        </Col>
        <Col className="user-info-value" span={17}>
          Se001 - Agency sadfdfdfd
        </Col>
      </Row>
    </Col>
  );
};

export default UserInfo;
