import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Form, Input, Button, Table, Row, message } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import AdminButton from "../AdminButton";
import {
  validateInteger,
  validateDouble,
} from "../../../utils/form_validators";
import {
  getAgencyCommission,
  getCommissionApiCall,
  updateCommissionApiCall,
} from "../../../store/commission";

const CommissionForm = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  let commission = useSelector((state) => getAgencyCommission(state, id));
  let initialValues = { windows: commission ?? [] };

  console.log("commission form", "commission", commission);
  console.log("commission form", "initialValues", initialValues);

  const validateWindows = (windows) => {
    // Parse start and end values
    const parsedWindows = windows.map((window) => ({
      ...window,
      start: parseInt(window.start),
      end: parseInt(window.end),
    }));

    // Check if all ends are greater or equal than starts.
    parsedWindows.forEach((window) => {
      const { start, end } = window;
      if (start > end) {
        messageApi.open({
          type: "error",
          content: `${start} should be less than ${end}.`,
        });
        return false;
      }
    });

    const sortedWindows = [...parsedWindows].sort((a, b) => a.start - b.start);

    // Check if there is an overlap between windows.
    for (let i = 0; i < sortedWindows.length - 1; i++) {
      const currentEnd = sortedWindows[i].end;
      const nextStart = sortedWindows[i + 1].start;

      if (currentEnd >= nextStart) {
        messageApi.open({
          type: "error",
          content: "Windows should be continuous",
        });
        return false;
      }
    }
    return true;
  };

  const addCommission = async (addRow) => {
    try {
      const { windows } = await form.validateFields();
      const isValid = validateWindows(windows);
      if (isValid) {
        const lastAddedWindow = windows[windows.length - 1];
        if (!lastAddedWindow) {
          addRow();
        } else if (!lastAddedWindow.id) {
          await dispatch(updateCommissionApiCall(id, lastAddedWindow));
          addRow();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    dispatch(getCommissionApiCall(id));
  }, []);

  return (
    <>
      {contextHolder}
      <div className="page-title">Manage Commission</div>
      <Form className="table" form={form} initialValues={initialValues}>
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
                          { validator: validateInteger },
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
                        rules={[
                          { required: true, message: "End is required" },
                          { validator: validateInteger },
                        ]}
                      >
                        <Input placeholder="End" />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Comission",
                    dataIndex: "commission",
                    key: "commission",
                    render: (_, record, index) => (
                      <Form.Item
                        name={[index, "commission"]}
                        noStyle
                        rules={[
                          { required: true, message: "Value is required" },
                          { validator: validateDouble },
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
              />
              <Row justify="end" className="commission-btns">
                <Form.Item>
                  <AdminButton
                    type="primary"
                    icon={<PlusOutlined />}
                    className="admin-padded-btns"
                    htmlType="submit"
                    label={"Add"}
                    onClick={() => addCommission(add)}
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
