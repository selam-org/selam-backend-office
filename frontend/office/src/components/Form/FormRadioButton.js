import React from "react";
import { Form, Radio } from "antd";

const FormRadioButton = ({ label, onChange, value, ...rest }) => {
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
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={1}>Money</Radio>
        <Radio value={2}>Product</Radio>
      </Radio.Group>
    </Form.Item>
  );
};

export default FormRadioButton;
