import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, Space } from "antd";
import { getCashiers, getCashiersApiCall } from "../../store/cashier";
import NewCashierModal from "../../components/admin/cashier/NewCashierModal";
import EditCashierModal from "../../components/admin/cashier/EditCashierModal";
import ChangeCashierPasswordModal from "../../components/admin/cashier/ChangeCashierPasswordModal";
import "../styles/Admin.css";

const Cashiers = () => {
  const dispatch = useDispatch();
  const cashiers = useSelector(getCashiers);

  useEffect(() => {
    dispatch(getCashiersApiCall());
  }, []);

  const cashiersTableColumns = [
    { title: "Full Name", dataIndex: "full_name", key: "full_name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (_, { is_active }) => <> {is_active ? "Active" : "Inactive"}</>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, cashier) => {
        return (
          <Space size="middle">
            <EditCashierModal id={cashier.id} />
            <ChangeCashierPasswordModal id={cashier.id} />
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Row justify={"space-between"}>
        <Col>
          <div className="page-title">Manage Cashiers</div>
        </Col>
        <Col>
          <NewCashierModal />
        </Col>
      </Row>
      <Table
        className="table"
        columns={cashiersTableColumns}
        dataSource={cashiers}
      ></Table>
    </>
  );
};

export default Cashiers;
