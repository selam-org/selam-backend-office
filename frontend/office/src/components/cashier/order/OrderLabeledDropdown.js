import { Row, Col } from "antd";
import "../../../pages/styles/Order.css";

import FormLabel from "../form/FormLabel";
import FormDropdown from "../form/FormDropdown";

const OrderLabeledDropdown = ({
  label,
  isRequired,
  inputSpan = 12,
  searchIcon,
  // disabled,
  ...rest
}) => {
  return (
    <Row className="order-input" justify="start">
      <div className="order-form-label">
        <FormLabel label={label} isRequired={isRequired} />
      </div>
      <Col span={inputSpan}>
        <FormDropdown {...rest} />
      </Col>
      <Col span={1} className="order-search-icon">
        {searchIcon}
      </Col>
    </Row>
  );
};

export default OrderLabeledDropdown;

// "id": 1,
//     "sender_first_name": "ROBEL",
//     "sender_last_name": "GEBRETSADIK",
//     "sender_country": "United States",
//     "sender_city": "PITTSBURGH, Pennsylvania-15206",
//     "sender_state": "Pennsylvania",
//     "sender_phone": "2024467584",
//     "sender_address": "5435 STANTON AVE",
//     "sender_mother_maiden": " ",
//     "sender_birth_date": "1983-05-27",
//     "sender_mobile_phone": "",
//     "sender_account": "",
//     "sender_ssn": "813-20-7958",
//     "id_type": "32277665",
//     "sender_state_identification": "United States",
//     "sender_country_identification": "United States",
//     "sender_identification_number": ""
