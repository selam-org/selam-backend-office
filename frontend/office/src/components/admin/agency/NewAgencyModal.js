import { Row, Form, Modal, Input, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  addAgencyApiCall,
  isAddAgencyLoading,
  setIsAddAgencyModalOpen,
  setIsAddAgencySuccess,
  isAddAgencyModalOpen,
  getAddAgencyErrors,
  isAddAgencySuccess,
} from "../../../store/agency";
import AdminButton from "../AdminButton";
import "../../../pages/styles/Admin.css";
import useAntdMessage from "../../../hooks/useAntdMessage";
import { validateDouble } from "../../../utils/form_validators";

const NewAgencyModal = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const open = useSelector(isAddAgencyModalOpen);
  const isLoading = useSelector(isAddAgencyLoading);
  const errors = useSelector(getAddAgencyErrors);
  const success = useSelector(isAddAgencySuccess);

  const showNewAgencyModal = () => {
    dispatch(setIsAddAgencyModalOpen({ open: true }));
  };

  const handleNewAgencyModalCancel = () => {
    dispatch(setIsAddAgencyModalOpen({ open: false }));
  };

  const validateMinimumMaximum = (_, value) => {
    const formValues = form.getFieldsValue();
    const currentMaximum = formValues.max_rate;
    const currentMinimum = formValues.min_rate;
    if (
      currentMinimum !== undefined &&
      currentMaximum !== undefined &&
      parseFloat(currentMinimum) > parseFloat(currentMaximum)
    ) {
      return Promise.reject(
        new Error("Minimum value cannot be greater than Maximum")
      );
    } else {
      return Promise.resolve();
    }
  };

  const onFinish = (values) => {
    form
      .validateFields()
      .then(async (values) => {
        await dispatch(addAgencyApiCall(values));
      })
      .catch((err) => {});
  };

  const onAgencyAdded = () => {
    dispatch(setIsAddAgencySuccess({ open: false }));
    dispatch(setIsAddAgencyModalOpen({ open: false }));
  };

  useAntdMessage(
    errors,
    success,
    form,
    onAgencyAdded,
    "Agency added successfully"
  );

  return (
    <Form name="add_agency" form={form} initialValues={{}}>
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
        <Form.Item
          className="modal-input"
          name="min_rate"
          rules={[
            {
              required: true,
              message: "Please add a minimum rate",
            },
            { validator: validateDouble },
            { validator: validateMinimumMaximum },
          ]}
        >
          <Input placeholder={"Minimum rate"} />
        </Form.Item>
        <Form.Item
          className="modal-input"
          name="max_rate"
          rules={[
            {
              required: true,
              message: "Please add a maximum rate",
            },
            { validator: validateDouble },
            { validator: validateMinimumMaximum },
          ]}
        >
          <Input placeholder={"Maximum rate"} />
        </Form.Item>
        <Form.Item
          className="modal-input"
          name="default_rate"
          rules={[
            {
              required: true,
              message: "Please add a default rate",
            },
            { validator: validateDouble },
          ]}
        >
          <Input placeholder={"Default rate"} />
        </Form.Item>
      </Modal>
    </Form>
  );
};

export default NewAgencyModal;
