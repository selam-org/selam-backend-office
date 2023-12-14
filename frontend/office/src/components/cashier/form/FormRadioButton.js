import React from "react";
import { Form, Radio } from "antd";

/* options is a list of objects containing value and title properties. */
const FormRadioButton = ({ options = [], label, onChange, value, ...rest }) => {
  return (
    <Form.Item
      label={label}
      name="selectedOption"
      className="form-dropdown"
      style={{
        padding: 0,
        margin: 0,
        height: 30,
      }}
    >
      <Radio.Group onChange={onChange} value={value} {...rest}>
        {options.map((option) => (
          <Radio value={option.value}>{option.title}</Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};

export default FormRadioButton;
