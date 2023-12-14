import "../../../../pages/styles/Order.css";
import { Form, Row, Col } from "antd";
import FormHeader from "../../form/FormHeader";
import OrderLabeledInput from "../OrderLabeledInput";
import OrderLabeledDropdown from "../OrderLabeledDropdown";
import SearchIcon from "../../SearchIcon";
import AppPrimaryButton from "../../AppPrimaryButton";
import FormHeaderInput from "../../form/FormHeaderInput";
import FormHeaderDropdown from "../../form/FormHeaderDropdown";

const ReceiverInformationForm = () => {
  return (
    <Form>
      <FormHeader label={"RECEIVER INFORMATION"}>
        <Col span={7} style={{ paddingLeft: 15 }}>
          <FormHeaderDropdown label="Select Receiver" isRequired={true} />
        </Col>
        <Col span={8}>
          <Row align="middle" justify="end">
            <FormHeaderInput label="Account:" isRequired={true} />
            <Col style={{ marginLeft: 2 }}>
              <AppPrimaryButton label="New" />
            </Col>
          </Row>
        </Col>
      </FormHeader>

      <Row className="order-row">
        <Col span={8}>
          <OrderLabeledDropdown label="Country" isRequired={true} />
        </Col>
        <Col span={8}>
          <OrderLabeledDropdown
            label="City"
            inputSpan={10}
            isRequired={true}
            searchIcon={<SearchIcon />}
          />
        </Col>
        <Col span={8}>
          <OrderLabeledDropdown label="State" isRequired={true} />
        </Col>
      </Row>

      <Row className="order-row">
        <Col span={8}>
          <OrderLabeledInput label="First Name" isRequired={true} />
        </Col>
        <Col span={8}>
          <OrderLabeledInput label="Middle Name" />
        </Col>
        <Col span={8}>
          <OrderLabeledInput label="Last Name" isRequired={true} />
        </Col>
      </Row>

      <Row className="order-row">
        <Col span={8}>
          <OrderLabeledInput label="Mother's Maiden" isRequired={true} />
        </Col>
        <Col span={16}>
          <OrderLabeledInput label="Address" isRequired={true} inputSpan={18} />
        </Col>
      </Row>

      <Row className="order-row">
        <Col span={8}>
          <OrderLabeledInput label="Phone" isRequired={true} />
        </Col>
        <Col span={8}>
          <OrderLabeledInput label="Mobile Phone" />
        </Col>
        <Col span={8}>
          <OrderLabeledInput label="DOB" />
        </Col>
      </Row>

      <Row className="order-row order-output-row" justify="center">
        <Col span={5}>
          <p className="app-text success-text">Record Saved Succesfully</p>
        </Col>
        <Col span={11}>
          <p className="app-text red-highlight">
            Click edit button to amend customer information
          </p>
        </Col>
        <Col span={8}>
          <Row className="order-output-btns" justify="end">
            <AppPrimaryButton label="Edit" outlined={true} />
            <div style={{ marginLeft: 5 }}>
              <AppPrimaryButton label="Save" />
            </div>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default ReceiverInformationForm;
