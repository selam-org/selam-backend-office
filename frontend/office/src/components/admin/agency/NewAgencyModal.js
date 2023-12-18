import { Row, Form, Modal, Input, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  addAgencyApiCall,
  isAddAgencyLoading,
  setIsAddAgencyModalOpen,
  isAddAgencyModalOpen,
  getAddAgencyErrors,
  isAddAgencySuccess,
} from "../../../store/agency";
import AdminButton from "../AdminButton";
import "../../../pages/styles/Admin.css";

const NewAgencyModal = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const open = useSelector(isAddAgencyModalOpen);
  const isLoading = useSelector(isAddAgencyLoading);
  const errors = useSelector(getAddAgencyErrors);
  const success = useSelector(isAddAgencySuccess);

  const [messageApi, contextHolder] = message.useMessage();

  const showNewAgencyModal = () => {
    dispatch(setIsAddAgencyModalOpen({ open: true }));
  };

  const handleNewAgencyModalCancel = () => {
    dispatch(setIsAddAgencyModalOpen({ open: false }));
  };

  const onFinish = (values) => {
    form
      .validateFields()
      .then(async (values) => {
        await dispatch(addAgencyApiCall(values));
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
        content: "Agency added succesfully",
      });
    }

    if (Object.keys(errors).length > 0) {
      showErrorPopup();
    }
    if (success) {
      showSuccessPopup();
      dispatch(setIsAddAgencyModalOpen({ open: false }));
      form.resetFields();
    }
  }, [errors, success]);

  return (
    <Form name="add_agency" form={form} initialValues={{}}>
      {contextHolder}
      <AdminButton label={"New"} onClick={showNewAgencyModal} />
      <Modal
        title="Add an agency"
        open={open}
        confirmLoading={isLoading}
        onCancel={handleNewAgencyModalCancel}
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
          name="name"
          rules={[
            {
              required: true,
              message: "Please add the name of the agency",
            },
          ]}
        >
          <Input placeholder={"Agency"} />
        </Form.Item>
        <Form.Item
          className="modal-input"
          name="address"
          rules={[
            {
              required: true,
              message: "Please add the address of the agency",
            },
          ]}
        >
          <Input placeholder={"Address"} />
        </Form.Item>
      </Modal>
    </Form>
  );
};

export default NewAgencyModal;
