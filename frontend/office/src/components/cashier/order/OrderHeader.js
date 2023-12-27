import { Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AppPrimaryButton from "../AppPrimaryButton";
import OrderHeaderLink from "./OrderHeaderLink";
import OrderHeaderInfo from "./OrderHeaderInfo";
import FormDropdown from "../form/FormDropdown";
import { getLoggedinUser, logoutApi } from "../../../store/auth";

const OrderHeader = () => {
  const themeOptions = [{ title: "Yellow theme", value: "yellowTheme" }];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getLoggedinUser);

  const handleLogout = () => {
    dispatch(logoutApi());
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="order-header" style={{ marginBottom: 5 }}>
      <Row align={"middle"} style={{ marginBottom: 12 }}>
        <Col span={12}>
          <img src="/images/logo.png" width={100} alt="logo" />
        </Col>
        <Col span={12} align={"right"}>
          <OrderHeaderInfo title="User" value={user.full_name} />
          <OrderHeaderInfo title="Agency" value={user.agency_name} />
        </Col>
      </Row>
      <Row style={{ padding: "0 10px" }}>
        <Col span={12}>
          <AppPrimaryButton label="Show me Balance & Credit Limit" />
        </Col>
        <Col span={12}>
          <Row justify={"end"} align={"middle"}>
            <Col span={6}>
              <FormDropdown
                options={themeOptions}
                defaultValue={themeOptions[0].title}
              />
            </Col>
            <Col>
              <Link to={"/"}>
                <OrderHeaderLink label="Search Customer" />
              </Link>
              <OrderHeaderLink label="Main Page" />
              <btn onClick={handleLogout}>
                <OrderHeaderLink label="Logout" />
              </btn>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default OrderHeader;
