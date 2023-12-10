import { Form, Row, Col } from "antd";
import AppFormInput from "../components/Form/VerticalFormInput";
import Page from "../components/Page";

const Transctions = () => {
  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  return (
    <Page title={"Transactions"}>
      <Form onFinish={onFinish} labelCol={{ span: 6 }}>
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
      </Form>
      <h3> Results</h3>
    </Page>
  );
};

const TransactionsInput = (props) => {
  return <Col span={3}>{<AppFormInput {...props} />}</Col>;
};

export default Transctions;
