import React from "react";
import { Form, Radio } from "antd";

const AppRadioFormInput = ({ label, name }) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required: true, message: "Please select an option!" }]}
      style={{ margin: 0 }}
    >
      <Radio.Group>
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
      </Radio.Group>
    </Form.Item>
  );
};

export default AppRadioFormInput;
