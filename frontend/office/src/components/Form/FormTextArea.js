import React from "react";
import { Input, Form } from "antd";
import "./FormTextArea.css";

const { TextArea } = Input;

const FormTextArea = ({
  name,
  rules,
  className,
  minRows = 3,
  maxRows = 5,
  ...rest
}) => {
  return (
    <Form.Item name={name} rules={rules} className={`form-item ${className}`}>
      <TextArea autoSize={{ minRows, maxRows }} {...rest} />
    </Form.Item>
  );
};

export default FormTextArea;
