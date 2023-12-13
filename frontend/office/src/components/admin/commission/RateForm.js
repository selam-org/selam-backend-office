import React from "react";
import { Form, Input, Row, Col } from "antd";
import AdminButton from "../AdminButton";
import PageTitle from "../PageTitle";

const RateForm = () => {
  return (
    <div className="rate-form-container">
      <PageTitle title={"Manage Rate"} />
      <Form className="rate-form">
        <Row align={"middle"}>
          <Col>
            <Form.Item
              name="rate"
              rules={[{ required: true, message: "Please put a rate!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <AdminButton
                type="primary"
                htmlType="submit"
                label={"Save"}
                className={"admin-padded-btns"}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default RateForm;