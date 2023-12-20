import { useEffect } from "react"; // Import useEffect from react
import { Form, Modal, Input, Select } from "antd";
import {
  changePasswordApiCall,
  isChangePasswordLoading,
  isChangePasswordModalOpen,
  setIsChangePasswordModal,
  getChangePasswordErrors,
  getCashier,
  getChangePasswordSuccess,
} from "../../../store/cashier";
import { useDispatch, useSelector } from "react-redux";
import AdminButton from "../AdminButton";
import useAntdMessage from "../../../hooks/useAntdMessage";

const ChangeCashierPasswordModal = ({ id }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const open = useSelector(isChangePasswordModalOpen);
  const isLoading = useSelector(isChangePasswordLoading);
  const errors = useSelector(getChangePasswordErrors);
  const success = useSelector(getChangePasswordSuccess);

  const showChangePassowrdModal = () => {
    dispatch(setIsChangePasswordModal({ id, open: true }));
  };

  const handleAdd = () => {
    form
      .validateFields()
      .then((values) => {
        // console.log(values);
        dispatch(changePasswordApiCall(id, values["password"]));
        form.resetFields();
      })
      .catch(console.log);
  };

  const handleCancel = () => {
    dispatch(setIsChangePasswordModal({ id, open: false }));
  };

  const onSuccess = () => {
    dispatch(setIsChangePasswordModal({ id, open: false }));
  };

  useEffect(() => {
    console.log("Password changed", success);
  }, [success]);

  // useAntdMessage(
  //   errors,
  //   success,
  //   form,
  //   onSuccess,
  //   "Password changed successfully"
  // );

  return (
    <>
      <AdminButton
        label={"Change Password"}
        onClick={showChangePassowrdModal}
      />
      <Form name="change-password-form" form={form}>
        <Modal
          title="Change cashier's password"
          open={open[id]}
          onOk={handleAdd}
          confirmLoading={isLoading}
          onCancel={handleCancel}
          okText="Save"
        >
          <div className="modal-title"></div>
          {/* Password Input */}
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
          {/* Confirm Password Input */}
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
          {/* Rest of the fields can be removed since we only need Password and Confirm Password */}
        </Modal>
      </Form>
    </>
  );
};

export default ChangeCashierPasswordModal;
