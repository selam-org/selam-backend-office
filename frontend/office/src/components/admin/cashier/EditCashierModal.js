import { useEffect } from "react"; // Import useEffect from react
import { Form, Modal, Input, Select } from "antd";
import {
  updateCashierApiCall,
  isUpdateCashierLoading,
  getUpdateCashierErrors,
  getCashier,
  isUpdateCashierSuccess,
  setIsUpdateCashieSuccess,
  clearUpdateCashierError,
} from "../../../store/cashier";
import { getAgencies } from "../../../store/agency";
import { useDispatch, useSelector } from "react-redux";
import useAntdMessage from "../../../hooks/useAntdMessage";

const { Option } = Select;

const EditCashierModal = ({ id, onCancel, open }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const isLoading = useSelector(isUpdateCashierLoading);
  const errors = useSelector(getUpdateCashierErrors);
  const success = useSelector(isUpdateCashierSuccess);
  const cashier = useSelector((state) => getCashier(state, id));
  const agencies = useSelector(getAgencies);

  const initialValues = {
    ...cashier,
  };

  const handleAdd = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        dispatch(updateCashierApiCall(id, values));
        form.resetFields();
      })
      .catch(console.log);
  };

  const onSuccessMessageShown = () => {
    onCancel();
    dispatch(setIsUpdateCashieSuccess(false));
  };

  const onErrorShown = () => {
    dispatch(clearUpdateCashierError());
  };

  useEffect(() => {
    form.setFieldsValue(cashier);
  }, [cashier, form]);

  useAntdMessage(
    errors,
    success,
    form,
    "Cashier info updated successfully",
    onSuccessMessageShown,
    onErrorShown
  );

  return (
    <>
      <Form name="edit-cashier-form" form={form} initialValues={initialValues}>
        <Modal
          title="Edit Cashier's profile"
          open={open}
          onCancel={onCancel}
          onOk={handleAdd}
          confirmLoading={isLoading}
          okText="Save"
          cancelText="Close"
        >
          <div className="modal-title"></div>
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
            <Input placeholder="First name" />
          </Form.Item>
          <Form.Item
            name="last_name"
            className="modal-input"
            rules={[
              {
                required: true,
                message: "Please add last name of the cashier",
              },
            ]}
          >
            <Input placeholder="Last Name" />
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
          <Form.Item name="agency" rules={[{ required: true }]}>
            <Select placeholder="Agency">
              {agencies.map((option) => (
                <Option key={option.id} value={option.id}>
                  {option.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Modal>
      </Form>
    </>
  );
};

export default EditCashierModal;
