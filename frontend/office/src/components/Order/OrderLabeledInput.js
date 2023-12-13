import { Row, Col } from "antd";
import "../../pages/styles/Order.css";
import FormInput from "../form/FormInput";
import FormLabel from "../form/FormLabel";

const OrderLabeledInput = ({
  label,
  isRequired,
  inputSpan = 12,
  searchIcon,
  InputComponent = FormInput,
  ...rest
}) => {
  return (
    <Row className="order-input">
      <div className="order-form-label">
        <FormLabel label={label} isRequired={isRequired} />
      </div>
      <Col span={inputSpan}>
        <InputComponent {...rest} />
      </Col>
      {searchIcon && (
        <Col span={1} className="order-search-icon">
          {searchIcon}
        </Col>
      )}
    </Row>
  );
};

export default OrderLabeledInput;
