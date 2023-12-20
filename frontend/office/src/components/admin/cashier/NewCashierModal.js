import { Row, Form, Modal, Input, Space, message, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAgencies } from "../../../store/agency";
import {
  addCashierApiCall,
  isAddCashierLoading,
  setIsAddCashierModalOpen,
  setIsAddCashierSuccess,
  isAddCashierModalOpen,
  getAddCashierErrors,
  isAddCashierSuccess,
} from "../../../store/cashier";
import AdminButton from "../AdminButton";
import "../../../pages/styles/Admin.css";

const { Option } = Select;

const NewCashierModal = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const open = useSelector(isAddCashierModalOpen);
  const isLoading = useSelector(isAddCashierLoading);
  const errors = useSelector(getAddCashierErrors);
  const success = useSelector(isAddCashierSuccess);
  const agencies = useSelector(getAgencies);
  const [messageApi, contextHolder] = message.useMessage();

  const showNewCashierModal = () => {
    dispatch(setIsAddCashierModalOpen({ open: true }));
  };

  const handleNewCashierModalCancel = () => {
    dispatch(setIsAddCashierModalOpen({ open: false }));
  };

  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log("new cashier", values);
        await dispatch(addCashierApiCall(values));
      })
      .catch((err) => {});
  };

  useEffect(() => {
    function showErrorPopup() {
      messageApi.open({
        type: "error",
        content: Object.values(errors).join("\n"),
      });
    }

    function showSuccessPopup() {
      messageApi.open({
        type: "success",
        content: "Cashier added succesfully",
      });
      dispatch(setIsAddCashierSuccess({ open: false }));
    }

    if (Object.keys(errors).length > 0) {
      showErrorPopup();
    }
    if (success) {
      showSuccessPopup();
      dispatch(setIsAddCashierModalOpen({ open: false }));
      form.resetFields();
    }
  }, [errors, success]);

  return (
    <Form name="add_cashier" form={form} initialValues={{}}>
      {contextHolder}
      <AdminButton label={"New"} onClick={showNewCashierModal} />
      <Modal
        title="Add a cashier"
        open={open}
        confirmLoading={isLoading}
        onCancel={handleNewCashierModalCancel}
        onOk={onFinish}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <Row align="end">
              <Space>
                <CancelBtn />
                <Form.Item>
                  <OkBtn
                    label={"Add"}
                    htmlType="submit"
                    loading={false}
                    disabled={false}
                  />
                </Form.Item>
              </Space>
            </Row>
          </>
        )}
      >
        <Form.Item
          name="first_name"
          className="modal-input"
          rules={[
            {
              required: true,
              message: "Please add first name of the cashier",
            },
          ]}
        >
          <Input placeholder={"First name"} />
        </Form.Item>
        <Form.Item
          className="modal-input"
          name="last_name"
          rules={[
            {
              required: true,
              message: "Please add last name of the cashier",
            },
          ]}
        >
          <Input placeholder={"Last name"} />
        </Form.Item>
        <Form.Item
          name="email"
          className="modal-input"
          rules={[
            {
              required: true,
              message: "Please add an email",
            },
            {
              type: "email",
              message: "Please enter a valid email address",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="agency"
          rules={[
            {
              required: true,
              message: "Please select an agency",
            },
          ]}
        >
          <Select placeholder="Agency">
            {agencies.map((option) => (
              <Option key={option.id} value={option.id}>
                {option.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="password"
          className="modal-input"
          rules={[
            {
              required: true,
              message: "Please add a password",
            },
            {
              min: 6,
              message: "Password must be at least 6 characters",
            },
          ]}
        >
          <Input.Password placeholder={"Password"} className />
        </Form.Item>
      </Modal>
    </Form>
  );
};

export default NewCashierModal;
