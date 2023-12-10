import React from "react";
import { Form, Input } from "antd";

const AppVerticalFormInput = ({ label, name, rules, ...rest }) => {
  return (
    <Form.Item name={name} rules={rules} className="form-item">
      <p style={{ margin: 0, fontSize: 13 }}>{label}</p>
      <Input {...rest} />
    </Form.Item>
  );
};

export default AppVerticalFormInput;
