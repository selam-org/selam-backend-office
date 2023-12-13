import { Form, Row, Col, Image } from "antd";
import FormInput from "../form/FormInput";

const onFinish = (values) => {
  console.log("Received values:", values);
};

const NewTransactionForm = () => {
  return (
    <Form
      onFinish={onFinish}
      labelCol={{ span: 6 }}
      className="new-transaction-form"
    >
      <div className="new-transaction-title">
        New Transaction (Search Customer)
      </div>
      <div className="new-transaction-box">
        <div className="new-transaction-border-title">
          New Transaction (Search Customer)
        </div>
        <Row gutter={4}>
          <TransactionsInput label="Telephone" name="telephone" />
          <TransactionsInput label="Accound ID" name="accountId" />
          <TransactionsInput label="First Name" name="firstName" />
          <TransactionsInput label="Middle Name" name="middleName" />
          <TransactionsInput label="Last Name" name="lastName" />
          <TransactionsInput
            label="Mother's Maiden Name"
            name="motherMaidenName"
          />
        </Row>
      </div>
      <div style={{ margin: "7px 0px" }}>
        <img src="/images/search-glass.png" width={50} alt="" />
        <img src="/images/transaction-icons.png" width={150} alt="" />
      </div>
    </Form>
  );
};

const TransactionsInput = ({ label, ...otherProps }) => {
  return (
    <Col span={4}>
      <p className="app-text" style={{ color: "black", marginBottom: -5 }}>
        {label}
      </p>
      <FormInput {...otherProps} />
    </Col>
  );
};

export default NewTransactionForm;
