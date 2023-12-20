import { Form, Row, Col, Image } from "antd";
import FormLabeledInput from "../form/FormLabeledInput";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionsApiCall } from "../../../store/transactions";
const NewTransactionForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const handleSearch = () => {
    console.log("Handle search called");
    form
      .validateFields()
      .then(async (values) => {
        if (
          values.sender_phone ||
          values.sender_first_name ||
          values.sender_last_name ||
          values.sender_account ||
          values.sender_mother_maiden
        ) {
          console.log(values);
          dispatch(getTransactionsApiCall(values));
        }
      })
      .catch((err) => {});
  };
  return (
    <Form form={form} labelCol={{ span: 6 }} className="new-transaction-form">
      <div className="new-transaction-title">
        New Transaction (Search Customer)
      </div>
      <div className="new-transaction-box">
        <div className="new-transaction-border-title">
          New Transaction (Search Customer)
        </div>
        <Row gutter={4}>
          <FormLabeledInput
            className="new-transaction-input"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            label="Telephone"
            name="sender_phone"
          />
          <FormLabeledInput
            className="new-transaction-input"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            label="Account ID"
            name="sender_account"
          />
          <FormLabeledInput
            className="new-transaction-input"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            label="First Name"
            name="sender_first_name"
          />
          <FormLabeledInput
            className="new-transaction-input"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            label="Middle Name"
            name="middleName"
          />
          <FormLabeledInput
            className="new-transaction-input"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            label="Last Name"
            name="sender_last_name"
          />
          <FormLabeledInput
            className="new-transaction-input"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            label="Mother's Maiden Name"
            name="sender_mother_maiden"
          />
        </Row>
      </div>
      <div style={{ margin: "7px 0px" }}>
        <img
          onClick={handleSearch}
          src="/images/search-glass.png"
          width={50}
          alt=""
        />
        <img src="/images/transaction-icons.png" width={150} alt="" />
      </div>
    </Form>
  );
};

export default NewTransactionForm;
