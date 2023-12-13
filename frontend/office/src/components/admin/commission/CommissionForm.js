import React from "react";
import { Form, Input, Button, Table, Row } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import AdminButton from "../AdminButton";

const CommissionForm = () => {
  const [form] = Form.useForm();

  return (
    <>
      <div className="page-title">Manage Commission</div>
      <Form className="table" form={form} initialValues={{ windows: [] }}>
        <Form.List name="windows">
          {(fields, { add, remove }) => (
            <>
              <Table
                dataSource={fields}
                columns={[
                  {
                    title: "Start",
                    dataIndex: "start",
                    key: "start",
                    render: (_, record, index) => (
                      <Form.Item
                        name={[index, "start"]}
                        noStyle
                        rules={[
                          { required: true, message: "Start is required" },
                        ]}
                      >
                        <Input placeholder="Start" />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "End",
                    dataIndex: "end",
                    key: "end",
                    render: (_, record, index) => (
                      <Form.Item
                        name={[index, "end"]}
                        noStyle
                        rules={[{ required: true, message: "End is required" }]}
                      >
                        <Input placeholder="End" />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Value",
                    dataIndex: "value",
                    key: "value",
                    render: (_, record, index) => (
                      <Form.Item
                        name={[index, "value"]}
                        noStyle
                        rules={[
                          { required: true, message: "Value is required" },
                        ]}
                      >
                        <Input placeholder="Value" />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Action",
                    key: "action",
                    render: (_, record, index) => (
                      <Button
                        type="text"
                        icon={<MinusOutlined />}
                        onClick={() => remove(index)}
                      />
                    ),
                  },
                ]}
                pagination={false}
                rowKey={(record, index) => index.toString()}
              />
              <Row justify="end" className="commission-btns">
                <Form.Item>
                  <Button
                    className="admin-padded-btns"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      add();
                    }}
                  >
                    Add
                  </Button>
                </Form.Item>
                <Form.Item>
                  <AdminButton
                    type="primary"
                    className="admin-padded-btns"
                    htmlType="submit"
                    label={"Save"}
                  />
                </Form.Item>
              </Row>
            </>
          )}
        </Form.List>
      </Form>
    </>
  );
};

export default CommissionForm;
