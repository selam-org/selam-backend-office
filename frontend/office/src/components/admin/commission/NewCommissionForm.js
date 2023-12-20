import { Form, Table, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import AdminButton from "../AdminButton";
import { addCommissionApiCall } from "../../../store/commission";
import {
  validateDouble,
  validatePercent,
} from "../../../utils/form_validators";

const NewCommissionForm = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const initialValues = {
    commission: [
      {
        start: "",
        end: "",
        commission: "",
      },
    ],
  };

  const handleAdd = async () => {
    try {
      const values = await form.validateFields();
      dispatch(addCommissionApiCall(id, values[0]));
      console.log("Reset to: ", initialValues);
      // form.setFieldsValue({
      //   commission: [
      //     {
      //       start: "",
      //       end: "",
      //       commission: "",
      //     },
      //   ],
      // });
      await form.resetFields;
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <>
      <div className="page-title commission-title">Manage Commission</div>
      <div className="page-sub-title">New Commission</div>
      <Form className="table" form={form} initialValues={initialValues}>
        <Table
          dataSource={initialValues.commission}
          rowKey={(record) => record.start}
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
                    { validator: validateDouble },
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
                    { validator: validatePercent },
                  ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
              ),
            },
            {
              title: "Action",
              dataIndex: "action",
              key: "action",
              render: (_, record, index) => (
                <Form.Item>
                  <AdminButton
                    type="primary"
                    icon={<PlusOutlined />}
                    className="admin-padded-btns"
                    htmlType="submit"
                    label={"Add"}
                    onClick={handleAdd}
                  />
                </Form.Item>
              ),
            },
          ]}
          pagination={false}
        />
        {/* <Row justify="end" className="commission-btns">
          <Form.Item>
            <AdminButton
              type="primary"
              icon={<PlusOutlined />}
              className="admin-padded-btns"
              htmlType="submit"
              label={"Add"}
              onClick={handleAdd}
            />
          </Form.Item>
        </Row> */}
      </Form>
    </>
  );
};

export default NewCommissionForm;
