import React, { useState } from "react";
import { Button, Modal, Row, Col, Form } from "antd";
import { DatePicker } from "antd";
import { useSelector, useDispatch } from "react-redux";
import SummaryTable from "./SummaryTable";
import {
  getSummaryApi,
  getSummary,
  isSummaryLoading,
  getSummaryError,
  setSummary,
} from "../../store/order";
const { RangePicker } = DatePicker;

const Reports = () => {
  const dispatch = useDispatch();
  const summary = useSelector(getSummary);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const loading = useSelector(isSummaryLoading);
  console.log(loading, "loading");
  const error = useSelector(getSummaryError);
  console.log(error, "error");
  console.log(summary, "summary");
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    dispatch(setSummary(null));
  };
  const [form] = Form.useForm();
  return (
    <>
      <span className="transaction-nav-item" onClick={showModal}>
        Reports
      </span>
      <Modal
        title="Summary of Reports"
        open={isModalOpen}
        onCancel={handleCancel}
        width={1100}
        okButtonProps={{ style: { display: 'none' } }}

      >
        <div>
          <Form form={form} initialValue={{}}>
            <Row justify="space-evenly">
              <Form.Item
                style={{
                  width: "100%",
                  display: "flex",
                  textAlign: "center",
                  marginBottom: "10px",
                  marginTop: "20px",
                }}
                name="range_picker"
                // label="Date range"
                rules={[{ required: true, message: "Please select date" }]}
              >
                <RangePicker style={{ width: "90%" }} />
              </Form.Item>
            </Row>
            <Row justify="space-evenly">
              <Button
                name="generate"
                loading={loading}
                disabled={loading}
                className="admin-btn"
                style={{
                  color: "white",
                  marginTop: "6px",
                  marginBottom: "30px",
                }}
                size="large"
                onClick={() => {
                  console.log("Generate button clicked");
                  form
                    .validateFields()
                    .then((values) => {
                      dispatch(
                        getSummaryApi({
                          start_date:
                            values.range_picker[0].format("YYYY-MM-DD"),
                          end_date: values.range_picker[1].format("YYYY-MM-DD"),
                        })
                      );
                      console.log("Received values of form: ", values);
                      console.log(values);
                    })
                    .catch((error) => {
                      console.log("Error: ", error);
                    });
                }}
              >
                Generate
              </Button>
            </Row>
          </Form>
          {summary && (
            <SummaryTable
              data={{
                ...summary,
                total: summary.fee_sum + summary.net_amount_receiver_sum,
                key: 1,
              }}
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default Reports;
