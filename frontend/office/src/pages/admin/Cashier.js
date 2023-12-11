import { Row, Col } from "antd";
import PageTitle from "../../components/PageTitle";
import "../styles/Agency.css";

const agencies = [
  {
    fullName: "Kidus Yoseph",
    userName: "kidcore",
    status: "Active",
    action: "",
  },
];

const Agency = () => {
  return (
    <>
      <PageTitle title={"Manage Agency"} />
      <Row
        style={{
          backgroundColor: "#d7e9ff",
          marginTop: 15,
        }}
      >
        <Col className="table-cell table-title" span={1}>
          No.
        </Col>
        <Col className="table-cell table-title" span={8}>
          Full Name
        </Col>
        <Col className="table-cell table-title" span={3}>
          User Name
        </Col>
        <Col className="table-cell table-title" span={3}>
          Status
        </Col>
        <Col className="table-cell table-title" span={8}>
          Action
        </Col>
      </Row>
    </>
  );
};

export default Agency;
