import React from "react";
import { Form, Input } from "antd";
import "./FormInput.css";

const FormInput = ({ name, rules, className, ...rest }) => {
  return (
    <Form.Item name={name} rules={rules} className={`form-item ${className}`}>
      <Input {...rest} />
    </Form.Item>
  );
};

export default FormInput;
