import { Row, Col } from "antd";
import PageTitle from "../../components/PageTitle";
import "../styles/Agency.css";
import AdminButton from "../../components/AdminButton";

const agencies = ["Silver spring"];

const Agency = () => {
  return (
    <>
      <PageTitle title={"Manage Agency"} />
      <Row
        style={{
          marginTop: 20,
        }}
      >
        <Col className="table-cell table-title" span={2}>
          No.
        </Col>
        <Col className="table-cell table-title" span={8}>
          Agency Name
        </Col>
        <Col className="table-cell table-title" span={10}>
          Action
        </Col>
      </Row>

      {agencies.map((agency, index) => (
        <Row align={"middle"}>
          <Col className="table-cell" span={2}>
            {index + 1}
          </Col>
          <Col className="table-cell" span={8}>
            {agency}
          </Col>
          <Col className="table-cell action-cell" span={10}>
            <AdminButton className="action-button" label={"Edit"} />
          </Col>
        </Row>
      ))}
    </>
  );
};

export default Agency;
