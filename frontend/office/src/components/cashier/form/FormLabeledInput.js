import { Col } from "antd";
import FormInput from "./FormInput";

const FormLabeledInput = ({
  label,
  labelClassName,
  colSpan = 4,
  InputComponent = FormInput,
  ...otherProps
}) => {
  return (
    <Col span={colSpan}>
      <p
        style={{ color: "black", marginBottom: -5 }}
        className={`app-text ${labelClassName}`}
      >
        {label}
      </p>
      <InputComponent {...otherProps} />
    </Col>
  );
};

export default FormLabeledInput;
