import FormInput from "../components/form/FormInput";
import "./styles/Login.css";
import { Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

const Login = () => {
  return (
    <div className="login-background">
      <div className="login-form">
        <img
          src="/images/logo.png"
          width={180}
          alt=""
          style={{ marginBottom: 5 }}
        />
        <div className="login-input">
          <div className="login-input-title">User Name</div>
          <FormInput placeholder={"Enter the Username"} />
        </div>
        <div className="login-input" style={{ margin: "15px 0px" }}>
          <div className="login-input-title">Password</div>
          <FormInput placeholder={"Enter your password"} />
        </div>
        <div className="login-input language-selector">
          <FormInput value={"English US"} />
          <DownOutlined
            style={{ fontSize: 10 }}
            className="language-selector-icon"
          />
        </div>

        <Button className="login-btn">Log Me In</Button>
      </div>
    </div>
  );
};

export default Login;
