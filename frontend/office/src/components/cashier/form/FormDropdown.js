import React, { useEffect } from "react";
import { Form, Select } from "antd";
import "./styles/FormDropdown.css";

const { Option } = Select;

/*
 options is an array of objects containing value and title properties.
*/
const FormDropdown = ({
  options = [],
  label,
  className,
  defaultValue,
  ...rest
}) => {
  useEffect(() => {}, [defaultValue]);
  const { disabled, onChange, ...other } = rest;
  return (
    <Form.Item
      label={label}
      name="selectedOption"
      className="form-dropdown"
      // rules={[{ required: true, message: "Please select an option!" }]}
      style={{
        padding: 0,
        margin: 0,
        height: 30,
      }}
      {...other}
    >
      <Select
        className={`form-select ${className}`}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <Option key={index} value={option.value}>
            {option.title}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default FormDropdown;
