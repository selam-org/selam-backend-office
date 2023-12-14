import { Col, Row } from "antd";
import "./styles/FormHeader.css";

const FormHeader = ({
  label,
  children,
  className,
  titleSpan = 8,
  ...otherProps
}) => {
  return (
    <>
      <Row
        justify="space-between"
        align="middle"
        className={`formHeader ${className}`}
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
