import { Form, Table, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AdminButton from "../AdminButton";
import {
  addCommissionApiCall,
  getAddCommissionErrors,
  isAddCommissionSuccess,
  isAddCommissionLoading,
  setIsAddCommissionSuccess,
} from "../../../store/commission";
import {
  validateDouble,
  validatePercent,
} from "../../../utils/form_validators";
import useAntdMessage from "../../../hooks/useAntdMessage";

const NewCommissionForm = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const isLoading = useSelector(isAddCommissionLoading);
  const errors = useSelector(getAddCommissionErrors);
  const success = useSelector(isAddCommissionSuccess);

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
    } catch (e) {
      console.log("error", e);
    }
  };

  const onSuccess = () => {
    dispatch(setIsAddCommissionSuccess(false));
    form.resetFields();
  };

  useAntdMessage(
    errors,
    success,
    form,
    onSuccess,
    "New commission added successfully"
  );

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
              title: "End",
              dataIndex: "end",
              key: "end",
              width: "33.3%",
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
              width: "33.3%",
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
              width: "33.3%",
              render: (_, record, index) => (
                <Form.Item>
                  <AdminButton
                    type="primary"
                    icon={<PlusOutlined />}
                    htmlType="submit"
                    label={"Add"}
                    onClick={handleAdd}
                    loading={isLoading}
                  />
                </Form.Item>
              ),
            },
          ]}
          pagination={false}
        />
      </Form>
    </>
  );
};

export default NewCommissionForm;
