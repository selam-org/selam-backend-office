import "../../../../pages/styles/Order.css";
import { Form, Row, Col } from "antd";
import FormHeader from "../../form/FormHeader";
import OrderLabeledInput from "../OrderLabeledInput";
import OrderLabeledDropdown from "../OrderLabeledDropdown";
import SearchIcon from "../../SearchIcon";
import AppPrimaryButton from "../../AppPrimaryButton";
import FormHeaderInput from "../../form/FormHeaderInput";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSenderApiCall,
  isUpdateSenderLoading,
  setSender,
} from "../../../../store/transactions";
const SenderInformationForm = (props) => {
  const [_form] = Form.useForm();
  const isLoading = useSelector(isUpdateSenderLoading);
  const dispatch = useDispatch();
  const countryOptions = [{ title: "Ethiopia", value: "Ethiopia" }];
  const { sender } = props;
  const [edit, setEdit] = useState(true);
  useEffect(() => {
    _form.setFieldsValue({ ...sender });
  }, [sender]);
  const handleSave = () => {
    _form
      .validateFields()
      .then((values) => {
        _form.resetFields();
        console.log(values, "values");
        dispatch(
          updateSenderApiCall(
            {
              ...values,
              sender_mobile_phone: "34",
              sender_account: "343",
            },
            sender.id
          )
        );
        setEdit(true);
        _form.setFieldValue(values);
      })
      .catch((err) => {});
  };

  return (
    <Form form={_form}>
      <FormHeader label={"SENDER INFORMATION"}>
        <Col span={8}>
          <Row align="middle" justify="end">
            <FormHeaderInput
              disabled
              name="sender_account"
              label="Account:"
              isRequired={true}
            />
            <Col style={{ marginLeft: 2 }}>
              <AppPrimaryButton label="New" />
            </Col>
          </Row>
        </Col>
      </FormHeader>
      <Row className="order-row">
        <Col span={8}>
          <OrderLabeledInput
            label="First Name"
            isRequired={true}
            name="sender_first_name"
            disabled={edit}
          />
        </Col>
        <Col span={8}>
          <OrderLabeledInput
            name="sender_middle_name"
            disabled={edit}
            label="Middle Name"
          />
        </Col>
        <Col span={8}>
          <OrderLabeledInput
            name="sender_last_name"
            disabled={edit}
            label="Last Name"
            isRequired={true}
          />
        </Col>
      </Row>

      <Row className="order-row">
        <Col span={8}>
          <OrderLabeledInput
            name="sender_maiden_name"
            disabled={edit}
            label="Mother's Maiden"
          />
        </Col>
        <Col span={16}>
          <OrderLabeledInput
            name="sender_address"
            disabled={edit}
            label="Address"
            isRequired={true}
            inputSpan={18}
          />
        </Col>
      </Row>

      <Row className="order-row">
        <Col span={8}>
          <OrderLabeledDropdown
            name="sender_country"
            disabled={edit}
            label="Country"
            isRequired={true}
            options={countryOptions}
          />
        </Col>
        <Col span={8}>
          <OrderLabeledInput
            name="sender_zip"
            disabled={edit}
            label="Zip"
            inputSpan={10}
            searchIcon={<SearchIcon />}
          />
        </Col>
        <Col span={8}>
          <OrderLabeledDropdown
            name="sender_state"
            disabled={edit}
            label="State"
            isRequired={true}
          />
        </Col>
      </Row>

      <Row className="order-row">
        <Col span={8}>
          <OrderLabeledDropdown
            label="City"
            name="sender_city"
            disabled={edit}
            inputSpan={10}
            isRequired={true}
            searchIcon={<SearchIcon />}
          />
        </Col>
        <Col span={8}>
          <OrderLabeledInput
            name="sender_phone"
            disabled={edit}
            label="Phone"
            isRequired={true}
          />
        </Col>
        <Col span={8}>
          <OrderLabeledInput
            name="sender_mobile_phone"
            disabled={edit}
            label="Mobile"
          />
        </Col>
      </Row>

      <Row className="order-row">
        <Col span={8}>
          <OrderLabeledInput
            name="sender_birth_date"
            disabled={edit}
            label="DOB"
          />
        </Col>
        <Col span={8}>
          <OrderLabeledDropdown
            name="sender_country_identification"
            disabled={edit}
            label="Residence"
            isRequired={true}
          />
        </Col>
        <Col span={8}>
          <OrderLabeledInput
            name="sender_occupation"
            disabled={edit}
            label="Occupation"
          />
        </Col>
      </Row>

      <Row className="order-row">
        <Col span={8}>
          <OrderLabeledInput
            name="sender_source_funds"
            disabled={edit}
            label="Source of funds"
          />
        </Col>
        <Col span={8}>
          <OrderLabeledInput
            name="sender_transaction_purpose"
            disabled={edit}
            label="Transaction purpose"
          />
        </Col>
      </Row>

      <Row className="order-row order-output-row" justify="center">
        <Col span={9} align={"left"}>
          <img
            style={{ marginTop: -5 }}
            src="/images/rewards.png"
            width={140}
            alt=""
          />
          <p className="app-text success-text" style={{ marginLeft: 35 }}>
            Record Saved Succesfully
          </p>
        </Col>
        <Col span={9}>
          <p className="app-text success-text">Driver License No: </p>
          <p className="app-text success-text">****5823</p>
        </Col>
        <Col span={6}>
          <Row className="order-output-btns" justify="end">
            <img
              style={{ marginRight: 2 }}
              src="/images/contacts.png"
              width={75}
              alt=""
            />

            <AppPrimaryButton
              onClick={() => {
                setEdit(false);
              }}
              label="Edit"
              outlined={true}
            />
            <div style={{ marginLeft: 5 }}>
              <AppPrimaryButton
                disabled={isLoading}
                loading={isLoading}
                onClick={handleSave}
                label="Save"
              />
            </div>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default SenderInformationForm;
