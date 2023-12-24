import "../../../../pages/styles/Order.css";
import { Form, Row, Col } from "antd";
import FormHeader from "../../form/FormHeader";
import OrderLabeledInput from "../OrderLabeledInput";
import OrderLabeledDropdown from "../OrderLabeledDropdown";
import SearchIcon from "../../SearchIcon";
import AppPrimaryButton from "../../AppPrimaryButton";
import FormHeaderInput from "../../form/FormHeaderInput";
import FormHeaderDropdown from "../../form/FormHeaderDropdown";
import { useDispatch, useSelector } from "react-redux";
// import { getReceivers, setReceiver } from "../../../../store/transactions";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  updateReceiverApiCall,
  addReceiverApiCall,
  getAddReceiverErrors,
  getUpdateReceiverErrors,
  isAddReceiverLoading,
  isUpdateReceiverLoading,
  getReceiver,
  getReceivers,
  setReceiver,
  setPayment,
} from "../../../../store/transactions";
const ReceiverInformationForm = () => {
  const dispatch = useDispatch();
  const receiver = useSelector(getReceiver);
  const isLoading =
    useSelector(isUpdateReceiverLoading) | useSelector(isAddReceiverLoading);
  const [receiverId, setReceiverId] = useState();
  const { senderId } = useParams();
  const receivers = useSelector((state) => getReceivers(state, senderId));
  // const [receiver, setReceiver] = useState();
  const [_form] = Form.useForm();
  const [edit, setEdit] = useState(true);
  useEffect(() => {
    _form.setFieldsValue({ ...receiver });
  }, [receiver]);
  const handleReceiverChange = (id) => {
    const re = receivers.find((receiver) => receiver.value + "" === id + "");

    dispatch(setReceiver(re));
    _form.setFieldsValue({ ...re });
    setEdit(true);
  };

  const handleSave = () => {
    if (edit) return;
    _form
      .validateFields()
      .then((values) => {
        if (receiver) {
          console.log("update");
          dispatch(updateReceiverApiCall(values, receiver.id));
        } else {
          dispatch(
            addReceiverApiCall({
              ...values,
              sender: senderId,
              receiver_account: "899",
              receiver_birth_date: "1983-05-27",
            })
          );
          setReceiverId("");
          setEdit(true);
        }
        _form.setFieldsValue(receiver);
      })
      .catch((err) => {});
  };

  return (
    <Form form={_form}>
      <FormHeader label={"RECEIVER INFORMATION"}>
        <Col span={7} style={{ paddingLeft: 15 }}>
          <FormHeaderDropdown
            options={receivers}
            defaultValue={receiver ? receiver.value : ""}
            onChange={handleReceiverChange}
            label="Select Receiver"
            isRequired={true}
          />
        </Col>
        <Col span={8}>
          <Row align="middle" justify="end">
            <FormHeaderInput label="Account:" isRequired={true} />
            <Col style={{ marginLeft: 2 }}>
              <AppPrimaryButton
                onClick={() => {
                  _form.resetFields();
                  setEdit(false);
                  dispatch(setReceiver(null));
                  dispatch(setPayment(null));
                }}
                label="New"
              />
            </Col>
          </Row>
        </Col>
      </FormHeader>

      <Row className="order-row">
        <Col span={8}>
          <OrderLabeledDropdown
            name="receiver_country"
            // defaultValue="Ethiopia"
            disabled={edit}
            label="Country"
            isRequired={true}
            options={[{ value: "Ethiopia", title: "Ethiopia" }]}
          />
        </Col>
        <Col span={8}>
          <OrderLabeledDropdown
            name="receiver_city"
            // defaultValue="ADDIS ABABA GPO"
            disabled={edit}
            label="City"
            inputSpan={10}
            isRequired={true}
            searchIcon={<SearchIcon />}
            options={[{ value: "ADDIS ABABA GPO", title: "ADDIS ABABA GPO" }]}
          />
        </Col>
        <Col span={8}>
          <OrderLabeledDropdown
            // defaultValue="Ethiopia"
            name="receiver_state"
            disabled={edit}
            label="State"
            isRequired={true}
            options={[{ value: "Ethiopia", title: "Ethiopia" }]}
          />
        </Col>
      </Row>

      <Row className="order-row">
        <Col span={8}>
          <OrderLabeledInput
            name="receiver_first_name"
            disabled={edit}
            label="First Name"
            isRequired={true}
            rules={[{ required: true, message: "" }]}
          />
        </Col>
        <Col span={8}>
          <OrderLabeledInput
            name="receiver_middle_name"
            disabled={edit}
            label="Middle Name"
          />
        </Col>
        <Col span={8}>
          <OrderLabeledInput
            name="receiver_last_name"
            rules={[{ required: true, message: "" }]}
            disabled={edit}
            label="Last Name"
            isRequired={true}
          />
        </Col>
      </Row>

      <Row className="order-row">
        <Col span={8}>
          <OrderLabeledInput
            name="receiver_maiden_name"
            disabled={edit}
            label="Mother's Maiden"
            isRequired={true}
          />
        </Col>
        <Col span={16}>
          <OrderLabeledInput
            name="receiver_address"
            disabled={edit}
            label="Address"
            isRequired={true}
            inputSpan={18}
          />
        </Col>
      </Row>

      <Row className="order-row">
        <Col span={8}>
          <OrderLabeledInput
            name="receiver_phone"
            disabled={edit}
            label="Phone"
            isRequired={true}
            rules={[{ required: true, message: "" }]}
          />
        </Col>
        <Col span={8}>
          <OrderLabeledInput
            name="receiver_mobile_phone"
            disabled={edit}
            label="Mobile Phone"
          />
        </Col>
        <Col span={8}>
          <OrderLabeledInput
            name="receiver_birth_date"
            disabled={edit}
            label="DOB"
          />
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
            <AppPrimaryButton
              onClick={() => setEdit(false)}
              label="Edit"
              outlined={true}
            />
            <div style={{ marginLeft: 5 }}>
              <AppPrimaryButton
                isLoading={isLoading}
                disabled={isLoading}
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

export default ReceiverInformationForm;
