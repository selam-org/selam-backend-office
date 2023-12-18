import React from "react";
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
  const { disabled, onChange, ...other } = rest;
  console.log(options, "options FormDropdown");
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
        {options.map((option) => (
          <Option value={option.value}>{option.title}</Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default FormDropdown;
