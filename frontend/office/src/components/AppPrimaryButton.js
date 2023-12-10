import { Button } from "antd";
import "./AppPrimaryButton.css";

const AppPrimaryButton = ({ label, icon, outlined = false, ...otherProps }) => {
  return (
    <Button
      shape="round"
      icon={icon}
      type={`${outlined ? "default" : "primary"}`}
      className={`app-btn ${outlined ? "outlined" : "primary"}`}
      {...otherProps}
    >
      <p>{label}</p>
    </Button>
  );
};

export default AppPrimaryButton;
