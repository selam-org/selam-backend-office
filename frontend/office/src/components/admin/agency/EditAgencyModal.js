import { useEffect } from "react"; // Import useEffect from react
import { Form, Modal, Input } from "antd";
import {
  updateAgencyApiCall,
  isUpdateAgencyLoading,
  isUpdateAgencyModalOpen,
  setIsUpdateAgencyModal,
  getUpdateAgencyErrors,
  getAgency,
} from "../../../store/agency";
import { useDispatch, useSelector } from "react-redux";

const EditAgencyModal = ({ id }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const open = useSelector(isUpdateAgencyModalOpen);
  const isLoading = useSelector(isUpdateAgencyLoading);
  const errors = useSelector(getUpdateAgencyErrors);
  const agency = useSelector((state) => getAgency(state, id));

  const initialValues = {
    ...agency,
  };

  const handleAdd = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      dispatch(updateAgencyApiCall(values, id));
    });
  };

  const handleCancel = () => {
    dispatch(setIsUpdateAgencyModal({ id, open: false }));
  };

  useEffect(() => {
    form.setFieldsValue(agency);
  }, [agency, form]);

  return (
    <Form name="edit-agency-form" form={form} initialValues={initialValues}>
      <Modal
        title="Edit agency"
        open={open[id]}
        onOk={handleAdd}
        confirmLoading={isLoading}
        onCancel={handleCancel}
        okText="Save"
      >
        <div className="modal-title"></div>
        <Form.Item
          name="name"
          rules={[{ required: true }]}
          className="modal-input"
        >
          <Input placeholder="Agency" />
        </Form.Item>
        <Form.Item
          name="address"
          rules={[{ required: true }]}
          className="modal-input"
        >
          <Input placeholder="Address" />
        </Form.Item>
      </Modal>
    </Form>
  );
};

export default EditAgencyModal;
