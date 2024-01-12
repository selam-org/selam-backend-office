import { DatePicker } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "../cashier/styles/DatePicker.css";

const CustomDatePicker = ({ ...props }) => {
  return (
    <div className="date-picker-container">
      <DatePicker className="date-picker" {...props} format="MM/DD/YYYY" />
      <div className="date-picker-icon-container">
        <DownOutlined size={1} className="date-picker-icon" />
      </div>
    </div>
  );
};

export default CustomDatePicker;
