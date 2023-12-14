import { Form, Row, Col } from "antd";
import FormDropdown from "./FormDropdown";

const FormHeaderDropdown = ({ label, name, rules }) => {
  return (
    <Row align="middle" justify="center">
      <Col style={{ marginRight: 10 }}>
        <p className="app-text bold-title">{label} </p>
      </Col>
      <Col span={14}>
        <Form.Item
          name={name}
          rules={rules}
          className="form-item form-header-input"
        >
          <FormDropdown />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default FormHeaderDropdown;
