import { Form, Modal, Input } from "antd";
import {
  changePasswordApiCall,
  isChangePasswordLoading,
  getChangePasswordErrors,
  clearChangePasswordError,
  getChangePasswordSuccess,
  setIsChangePasswordSuccess,
} from "../../../store/cashier";
import { useDispatch, useSelector } from "react-redux";
import useAntdMessage from "../../../hooks/useAntdMessage";

const ChangeCashierPasswordModal = ({ id, open, onCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const isLoading = useSelector(isChangePasswordLoading);
  const errors = useSelector(getChangePasswordErrors);
  const success = useSelector(getChangePasswordSuccess);

  const handleAdd = () => {
    form
      .validateFields()
      .then((values) => {
        dispatch(changePasswordApiCall(id, values["password"]));
        form.resetFields();
      })
      .catch(console.log);
  };

  const onSuccessMessageShown = () => {
    dispatch(setIsChangePasswordSuccess(false));
    onCancel();
  };

  const onErrorShown = () => {
    dispatch(clearChangePasswordError());
  };

  useAntdMessage(
    errors,
    success,
    form,
    "Password updated successfully",
    onSuccessMessageShown,
    onErrorShown
  );

  return (
    <>
      <Form name="change-password-form" form={form}>
        <Modal
          title="Change cashier's password"
          open={open}
          onOk={handleAdd}
          confirmLoading={isLoading}
          onCancel={onCancel}
          okText="Save"
          cancelText="Close"
        >
          <div className="modal-title"></div>
          <Form.Item
            name="password"
            className="modal-input"
            rules={[
              {
                required: true,
                message: "Please enter the password",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            className="modal-input"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm the password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
        </Modal>
      </Form>
    </>
  );
};

export default ChangeCashierPasswordModal;
