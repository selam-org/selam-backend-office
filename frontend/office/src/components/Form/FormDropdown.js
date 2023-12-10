import React from "react";
import { Form, Select } from "antd";
import "./styles/FormDropdown.css";

const { Option } = Select;
const FormDropdown = ({ label, ...rest }) => {
  return (
    <Form.Item
      label={label}
      name="selectedOption"
      className="form-dropdown"
      rules={[{ required: true, message: "Please select an option!" }]}
      style={{
        padding: 0,
        margin: 0,
        height: 30,
      }}
    >
      <Select className="form-select" placeholder="" style={{ height: 30 }}>
        <Option value="option1">Option 1</Option>
        <Option value="option2">Option 2</Option>
        <Option value="option3">Option 3 is a long text</Option>
      </Select>
    </Form.Item>
  );
};

export default FormDropdown;
