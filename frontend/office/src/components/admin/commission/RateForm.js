import React from "react";
import AdminButton from "../AdminButton";
import { useParams } from "react-router-dom";
import { Form, Input, Row, Col, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateAgencyApiCall, getAgency } from "../../../store/agency";

const RateForm = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const agency = useSelector((state) => getAgency(state, id));

  const handleSave = () => {
    form.validateFields().then((values) => {
      dispatch(updateAgencyApiCall(values, id));
    });
  };

  const initialValues = {
    rate: agency.rate,
  };

  return (
    <div className="rate-form-container">
      <div className="page-title">Manage Rate</div>
      <Form className="rate-form" initialValues={initialValues} form={form}>
        <Row align={"middle"}>
          <Col>
            <Form.Item
              name="rate"
              rules={[{ required: true, message: "Please put a rate!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <AdminButton
                type="primary"
                htmlType="submit"
                label={"Save"}
                className={"admin-padded-btns"}
                onClick={handleSave}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default RateForm;
