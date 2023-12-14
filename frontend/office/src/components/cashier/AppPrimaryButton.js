import { Button } from "antd";
import "./styles/AppPrimaryButton.css";

const AppPrimaryButton = ({
  label,
  icon,
  buttonClassName,
  outlined = false,
  ...otherProps
}) => {
  return (
    <Button
      icon={icon}
      type={`${outlined ? "default" : "primary"}`}
      className={`app-btn ${
        outlined ? "outlined" : "primary"
      } ${buttonClassName}`}
      {...otherProps}
    >
      <p className="app-btn-label">{label}</p>
    </Button>
  );
};

export default AppPrimaryButton;
