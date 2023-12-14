import { Form, Row, Col, Input } from "antd";

const FormHeaderInput = ({ label, inputSpan = 10, name, rules }) => {
  return (
    <Col span={inputSpan}>
      <Row align="middle" justify="space-between">
        <Col>
          <p className="app-text bold-title">{label} </p>
        </Col>
        <Col span={12}>
          <Form.Item
            name={name}
            rules={rules}
            className="form-item form-header-input"
          >
            <Input style={{ backgroundColor: "white" }} />
          </Form.Item>
        </Col>
      </Row>
    </Col>
  );
};

export default FormHeaderInput;
