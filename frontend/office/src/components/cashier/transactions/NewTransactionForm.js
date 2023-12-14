import { Form, Row, Col, Image } from "antd";
import FormLabeledInput from "../form/FormLabeledInput";

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
          <FormLabeledInput label="Telephone" name="telephone" />
          <FormLabeledInput label="Accound ID" name="accountId" />
          <FormLabeledInput label="First Name" name="firstName" />
          <FormLabeledInput label="Middle Name" name="middleName" />
          <FormLabeledInput label="Last Name" name="lastName" />
          <FormLabeledInput
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

export default NewTransactionForm;
