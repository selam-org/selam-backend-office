import React from "react";
import { Form, Select } from "antd";

const { Option } = Select;

const AppHeaderDropDownFormInput = ({ label }) => {
  return (
    <Form.Item
      label={label}
      name="selectedOption"
      rules={[{ required: true, message: "Please select an option!" }]}
      style={{
        padding: 0,
        margin: 0,
        height: 30,
      }}
    >
      <Select placeholder="Select an option" style={{ height: 30 }}>
        <Option value="option1">Option 1</Option>
        <Option value="option2">Option 2</Option>
        <Option value="option3">Option 3 is a long text</Option>
      </Select>
    </Form.Item>
  );
};

export default AppHeaderDropDownFormInput;
