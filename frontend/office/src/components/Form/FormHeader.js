import { Col, Row } from "antd";
import "./styles/FormHeader.css";

const FormHeader = ({ label, children, titleSpan = 8, ...otherProps }) => {
  return (
    <>
      <Row
        justify="space-between"
        align="middle"
        className="formHeader"
        {...otherProps}
      >
        <Col span={titleSpan}>
          <p className="headerTitle">{label}</p>
        </Col>
        {children}
      </Row>
    </>
  );
};

export default FormHeader;
