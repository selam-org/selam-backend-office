import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Form, Input, Table, message, Row, Space } from "antd";
import { validateDouble } from "../../../utils/form_validators";
import {
  deleteCommissionApiCall,
  getAgencyCommission,
  getCommissionApiCall,
  updateCommissionApiCall,
} from "../../../store/commission";
import AdminButton from "../AdminButton";

const CommissionForm = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const commission = useSelector((state) => getAgencyCommission(state, id));

  console.log("commission updated to: ", commission);
  var initialValues = {
    windows: commission ?? [],
  };

  const handleEdit = async (record) => {
    try {
      const values = await form.validateFields();
      const updatedCommission = Object.values(values["windows"]).find(
        (item) => item.id === record.id
      );
      dispatch(updateCommissionApiCall(record.id, updatedCommission));
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleDelete = async (record) => {
    try {
      dispatch(deleteCommissionApiCall(record.id));
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    dispatch(getCommissionApiCall(id));
  }, []);

  useEffect(() => {
    if (commission) {
      const sortedCommission = [...commission].sort(
        (a, b) => a.start - b.start
      );
      form.setFieldsValue({
        windows: sortedCommission,
      });
    }
  }, [commission, form]);

  return (
    <>
      {contextHolder}
      <div className="page-sub-title">Edit Commissions</div>
      <Form
        className="edit-comission"
        form={form}
        initialValues={initialValues}
      >
        <Form.List name="windows">
          {(fields, { add, remove }) => (
            <>
              <Table
                rowKey={(record) => record.id}
                className="table"
                dataSource={initialValues.windows}
                columns={[
                  {
                    title: "Start",
                    dataIndex: "start",
                    key: "start",
                    render: (_, record, index) => (
                      <>
                        <Form.Item name={"id"} noStyle></Form.Item>
                        <Form.Item
                          name={[index, "start"]}
                          noStyle
                          rules={[
                            { required: true, message: "Start is required" },
                            { validator: validateDouble },
                          ]}
                        >
                          <Input placeholder="Start" />
                        </Form.Item>
                      </>
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
                          { validator: validateDouble },
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
                      <Row>
                        <Space size="large">
                          <AdminButton
                            label={"Save"}
                            onClick={() => handleEdit(record)}
                          />
                          <AdminButton
                            label={"Delete"}
                            onClick={() => handleDelete(record)}
                          />
                        </Space>
                      </Row>
                    ),
                  },
                ]}
                pagination={false}
              />
            </>
          )}
        </Form.List>
      </Form>
    </>
  );
};

export default CommissionForm;
