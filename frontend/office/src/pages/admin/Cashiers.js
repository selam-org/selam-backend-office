import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, Space } from "antd";
import { getCashiers, getCashiersApiCall } from "../../store/cashier";
import NewCashierModal from "../../components/admin/cashier/NewCashierModal";
import EditCashierModal from "../../components/admin/cashier/EditCashierModal";
import ChangeCashierPasswordModal from "../../components/admin/cashier/ChangeCashierPasswordModal";
import "../styles/Admin.css";
import AdminButton from "../../components/admin/AdminButton";

const Cashiers = () => {
  const dispatch = useDispatch();
  const cashiers = useSelector(getCashiers);
  const [changePasswordModalId, setChangePasswordModalId] = useState(0);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);

  const [editCashierModalId, setEditCashiErModalId] = useState(0);
  const [editCashierModalOpen, setEditCashierModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getCashiersApiCall());
  }, []);

  const cashiersTableColumns = [
    { title: "Full Name", dataIndex: "full_name", key: "full_name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Agency", dataIndex: "agency", key: "agency" },
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
            <AdminButton
              label={"Edit"}
              onClick={() => {
                setEditCashiErModalId(cashier.id);
                setEditCashierModalOpen(true);
              }}
            />
            <AdminButton
              label={"Change Password"}
              onClick={() => {
                setChangePasswordModalId(cashier.id);
                setChangePasswordModalOpen(true);
              }}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <EditCashierModal
        id={editCashierModalId}
        open={editCashierModalOpen}
        onCancel={() => setEditCashierModalOpen(false)}
      />
      <ChangeCashierPasswordModal
        id={changePasswordModalId}
        open={changePasswordModalOpen}
        onCancel={() => setChangePasswordModalOpen(false)}
      />
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
