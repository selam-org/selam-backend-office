import "../../../pages/styles/Order.css";
import { Form, Row, Col } from "antd";
import FormHeader from "../../form/FormHeader";
import OrderLabeledInput from "../OrderLabeledInput";
import OrderLabeledDropdown from "../OrderLabeledDropdown";
import SearchIcon from "../../SearchIcon";
import AppPrimaryButton from "../../AppPrimaryButton";
import FormHeaderInput from "../../form/FormHeaderInput";

const SenderInformationForm = () => {
  return (
    <Form>
      <FormHeader label={"SENDER INFORMATION"}>
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
          <OrderLabeledInput label="Mother's Maiden" />
        </Col>
        <Col span={16}>
          <OrderLabeledInput label="Address" isRequired={true} inputSpan={18} />
        </Col>
      </Row>

      <Row className="order-row">
        <Col span={8}>
          <OrderLabeledDropdown label="Country" isRequired={true} />
        </Col>
        <Col span={8}>
          <OrderLabeledInput
            label="Zip"
            inputSpan={10}
            searchIcon={<SearchIcon />}
          />
        </Col>
        <Col span={8}>
          <OrderLabeledDropdown label="State" isRequired={true} />
        </Col>
      </Row>

      <Row className="order-row">
        <Col span={8}>
          <OrderLabeledDropdown
            label="City"
            inputSpan={10}
            isRequired={true}
            searchIcon={<SearchIcon />}
          />
        </Col>
        <Col span={8}>
          <OrderLabeledInput label="Phone" isRequired={true} />
        </Col>
        <Col span={8}>
          <OrderLabeledInput label="Mobile" />
        </Col>
      </Row>

      <Row className="order-row">
        <Col span={8}>
          <OrderLabeledDropdown
            label="DOB"
            inputSpan={10}
            isRequired={true}
            searchIcon={<SearchIcon />}
          />
        </Col>
        <Col span={8}>
          <OrderLabeledDropdown label="Residence" isRequired={true} />
        </Col>
        <Col span={8}>
          <OrderLabeledInput label="Occupation" />
        </Col>
      </Row>

      <Row className="order-row">
        <Col span={8}>
          <OrderLabeledInput label="Source of funds" />
        </Col>
        <Col span={8}>
          <OrderLabeledInput label="Transaction purpose" />
        </Col>
      </Row>

      <Row className="order-row order-output-row" justify="center">
        <Col span={9}>
          <p className="app-text success-text">Record Saved Succesfully</p>
        </Col>
        <Col span={9}>
          <p className="app-text success-text">Driver License No: </p>
          <p className="app-text success-text">****5823</p>
        </Col>
        <Col span={6}>
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

export default SenderInformationForm;
