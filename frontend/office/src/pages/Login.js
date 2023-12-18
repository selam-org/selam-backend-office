import FormInput from "../components/cashier/form/FormInput";
import { Form, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { login, isLoginLoading, getLoginError } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
import "./styles/Login.css";
import "./styles/Cashier.css";

const Login = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => isLoginLoading(state));
  const loginError = useSelector((state) => getLoginError(state));

  const onFinish = (values) => {
    dispatch(login(values));
  };

  return (
    <div className="login-background">
      <div className="login-box">
        <img
          src="/images/logo.png"
          width={180}
          alt=""
          style={{ marginBottom: 5 }}
        />
        <Form
          name="normal_login"
          initialValues={{}}
          onFinish={onFinish}
          className="login-form"
        >
          <div className="login-input">
            <div className="login-input-title">User Name</div>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <FormInput placeholder={"Enter the Username"} />
            </Form.Item>
          </div>
          <div className="login-input" style={{ margin: "15px 0px" }}>
            <div className="login-input-title">Password</div>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <FormInput placeholder={"Enter your password"} type="password" />
            </Form.Item>
          </div>
          <div className="login-input language-selector">
            <FormInput value={"English US"} />
            <DownOutlined
              style={{ fontSize: 10 }}
              className="language-selector-icon"
            />
          </div>
          <Form.Item>
            <Button
              className="login-btn"
              loading={isLoading}
              disabled={isLoading}
              htmlType="submit"
            >
              Log Me In
            </Button>
          </Form.Item>
        </Form>
        <div className="login-error-box">
          {loginError ? (
            <div>
              {loginError.non_field_errors
                ? loginError.non_field_errors.map((message, index) => (
                    <p key={index} className="login-error-message">
                      {" "}
                      {message}
                    </p>
                  ))
                : null}
              {loginError.detail
                ? loginError.detail.map((message, index) => (
                    <p key={message} className="login-error-message">
                      {" "}
                      {message}
                    </p>
                  ))
                : null}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
