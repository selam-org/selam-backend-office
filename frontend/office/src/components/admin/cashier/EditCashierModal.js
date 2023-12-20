import { useEffect } from "react"; // Import useEffect from react
import { Form, Modal, Input, Select } from "antd";
import {
  updateCashierApiCall,
  isUpdateCashierLoading,
  isUpdateCashierModalOpen,
  setIsUpdateCashierModal,
  getUpdateCashierErrors,
  getCashier,
} from "../../../store/cashier";
import { getAgencies } from "../../../store/agency";
import { useDispatch, useSelector } from "react-redux";
import AdminButton from "../AdminButton";

const { Option } = Select;

const EditCashierModal = ({ id }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const open = useSelector(isUpdateCashierModalOpen);
  const isLoading = useSelector(isUpdateCashierLoading);
  const errors = useSelector(getUpdateCashierErrors);
  const cashier = useSelector((state) => getCashier(state, id));
  const agencies = useSelector(getAgencies);

  const initialValues = {
    ...cashier,
  };

  const showNewCashierModal = () => {
    dispatch(setIsUpdateCashierModal({ id, open: true }));
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

  const handleCancel = () => {
    dispatch(setIsUpdateCashierModal({ id, open: false }));
  };

  useEffect(() => {
    form.setFieldsValue(cashier);
  }, [cashier, form]);

  return (
    <>
      <AdminButton label={"Edit"} onClick={showNewCashierModal} />
      <Form name="edit-cashier-form" form={form} initialValues={initialValues}>
        <Modal
          title="Edit Cashier's profile"
          open={open[id]}
          onOk={handleAdd}
          confirmLoading={isLoading}
          onCancel={handleCancel}
          okText="Save"
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
