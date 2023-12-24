import React, { useEffect } from "react";
import AdminButton from "../AdminButton";
import { useParams } from "react-router-dom";
import { Form, Input, Table, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getAgency,
  setShowRateUpdatedSuccess,
  isUpdateRateLoading,
  getUpdateRateError,
  getShowRateUpdatedSuccess,
  updateAgencyRateApiCall,
} from "../../../store/agency";
import useAntdMessage from "../../../hooks/useAntdMessage";
import { validateDouble } from "../../../utils/form_validators";

const RateForm = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const agency = useSelector((state) => getAgency(state, id));
  const isLoading = useSelector(isUpdateRateLoading);
  const errors = useSelector(getUpdateRateError);
  const success = useSelector(getShowRateUpdatedSuccess);

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        const new_rate = values.rates[0];
        dispatch(updateAgencyRateApiCall(new_rate, id));
      })
      .catch((err) => {});
  };

  const validateMinimumMaximum = (_, value) => {
    const formValues = form.getFieldsValue();
    const rates = formValues.rates[0];
    const currentMaximum = rates.max_rate;
    const currentMinimum = rates.min_rate;
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

  const initialValues = React.useMemo(() => {
    return {
      rates: [
        {
          min_rate: agency.min_rate,
          max_rate: agency.max_rate,
          default_rate: agency.default_rate,
        },
      ],
    };
  }, [agency]);

  const closeSuccessPopup = () => {
    dispatch(setShowRateUpdatedSuccess(false));
  };

  useAntdMessage(
    errors,
    success,
    form,
    closeSuccessPopup,
    "Rate updated successfully"
  );

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  console.log("Initial values", initialValues);

  return (
    <div className="rate-form-container">
      <div className="page-title">Manage Rate</div>
      <Form className="table" form={form} initialValues={initialValues}>
        <Form.List name="rates">
          {(fields, { add, remove }) => (
            <>
              <Table
                dataSource={initialValues.rates}
                rowKey={(record) => record.start}
                columns={[
                  {
                    title: "Minimum",
                    dataIndex: "min_rate",
                    key: "min_rate",
                    render: (_, record, index) => (
                      <Form.Item
                        name={[index, "min_rate"]}
                        noStyle
                        rules={[
                          { required: true, message: "Minimum is required" },
                          { validator: validateDouble },
                          { validator: validateMinimumMaximum },
                        ]}
                      >
                        <Input placeholder="Minimum" />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Maximum",
                    dataIndex: "max_rate",
                    key: "max_rate",
                    render: (_, record, index) => (
                      <Form.Item
                        name={[index, "max_rate"]}
                        noStyle
                        rules={[
                          { required: true, message: "Maximum is required" },
                          { validator: validateDouble },
                          { validator: validateMinimumMaximum },
                        ]}
                      >
                        <Input placeholder="Maximum" />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Default",
                    dataIndex: "default_rate",
                    key: "default_rate",
                    render: (_, record, index) => (
                      <Form.Item
                        name={[index, "default_rate"]}
                        noStyle
                        rules={[
                          { required: true, message: "Default is required" },
                          { validator: validateDouble },
                        ]}
                      >
                        <Input placeholder="Default" />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Action",
                    dataIndex: "action",
                    key: "action",
                    render: (_, record, index) => (
                      <Form.Item>
                        <AdminButton
                          type="primary"
                          htmlType="submit"
                          label={"Save"}
                          onClick={handleSave}
                          loading={isLoading}
                        />
                      </Form.Item>
                    ),
                  },
                ]}
                pagination={false}
              />
            </>
          )}
        </Form.List>
      </Form>
    </div>
  );
};

export default RateForm;
