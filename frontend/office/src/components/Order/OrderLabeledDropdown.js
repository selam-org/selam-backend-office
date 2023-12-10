import { Row, Col } from "antd";
import "../../pages/styles/Order.css";

import FormLabel from "../Form/FormLabel";
import FormDropdown from "../Form/FormDropdown";

const OrderLabeledDropdown = ({
  label,
  isRequired,
  inputSpan = 12,
  searchIcon,
  ...rest
}) => {
  return (
    <Row className="order-input" justify="start">
      <div className="order-form-label">
        <FormLabel label={label} isRequired={isRequired} />
      </div>
      <Col span={inputSpan}>
        <FormDropdown {...rest} />
      </Col>
      <Col span={1} className="order-search-icon">
        {searchIcon}
      </Col>
    </Row>
  );
};

export default OrderLabeledDropdown;
