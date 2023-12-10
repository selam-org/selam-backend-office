import React from "react";
import { Form, Select } from "antd";

const { Option } = Select;

const AppDropDownFormInput = ({ label }) => {
  return (
    <div className="horizontalFormItem">
      <p className="inputTitle" style={{ textAlign: "start" }}>
        {label}
      </p>

      <Form.Item
        name="selectedOption"
        rules={[{ required: true, message: "Please select an option!" }]}
        style={{
          padding: 0,
          margin: 0,
        }}
      >
        <Select placeholder="Select an option">
          <Option value="option1">Option 1</Option>
          <Option value="option2">Option 2</Option>
          <Option value="option3">Option 3</Option>
        </Select>
      </Form.Item>
    </div>
  );
};

export default AppDropDownFormInput;
