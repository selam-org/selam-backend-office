import { Button } from "antd";
import "./styles/AdminButton.css";

const AdminButton = ({
  label,
  icon,
  className,
  outlined = false,
  ...otherProps
}) => {
  return (
    <Button
      icon={icon}
      className={`admin-btn ${className}`}
      type={`${outlined ? "default" : "primary"}`}
      {...otherProps}
    >
      <span>{label}</span>
    </Button>
  );
};

export default AdminButton;
