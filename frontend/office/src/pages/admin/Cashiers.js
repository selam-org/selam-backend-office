import { useState } from "react";
import { Table, Space, Modal, Input, Select } from "antd";
import AdminButton from "../../components/admin/AdminButton";
import "../styles/Admin.css";

const { Option } = Select;

const Cashiers = () => {
  const [editModalOpen, setEditModalOpen] = useState();
  const [confirmEditLoading, setConfirmEditLoading] = useState(false);

  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState();
  const [confirmChangePasswordLoading, setconfirmChangePasswordLoading] =
    useState(false);

  const showEditModal = () => {
    setEditModalOpen(true);
  };

  const showChangePasswordModal = () => {
    setChangePasswordModalOpen(true);
  };

  const handleEditModalOk = () => {
    setConfirmEditLoading(true);
    setTimeout(() => {
      setEditModalOpen(false);
      setConfirmEditLoading(false);
    }, 2000);
  };

  const handleChangePasswordModalOk = () => {
    setconfirmChangePasswordLoading(true);
    setTimeout(() => {
      setChangePasswordModalOpen(false);
      setconfirmChangePasswordLoading(false);
    }, 2000);
  };

  const handleEditModalCancel = () => {
    setEditModalOpen(false);
  };

  const handleChangePasswordModalCancel = () => {
    setChangePasswordModalOpen(false);
  };

  const cashiers = [
    {
      id: 0,
      fullName: "Abdulefta Dedgeba",
      email: "se.abdulefta.dedgeba@gmail.com",
      isActive: false,
    },
  ];

  const cashiersTableColumns = [
    { title: "Full Name", dataIndex: "fullName", key: "fullName" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (_, { isActive }) => <> {isActive ? "Active" : "Inactive"}</>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, cashier) => {
        return (
          <Space size="middle">
            <Modal
              title="Edit cashier's name"
              open={editModalOpen}
              onOk={handleEditModalOk}
              confirmLoading={confirmEditLoading}
              onCancel={handleEditModalCancel}
            >
              <div className="modal-title "></div>
              <Input className="modal-input" placeholder="First name" />
              <Input className="modal-input" placeholder="Last name" />
              <Input className="modal-input" placeholder="Email" />
              <Select
                className="modal-input"
                style={{ width: "100%" }}
                placeholder="Agency"
              >
                <Option value={"agency"}>Agency 1</Option>
                <Option value={"agency"}>Agency 2</Option>
                <Option value={"agency"}>Agency 3</Option>
              </Select>
            </Modal>
            <AdminButton
              style={AdminButtonStyle}
              label={"Edit"}
              onClick={showEditModal}
            />
            <AdminButton style={AdminButtonStyle} label={"Activate"} />
            <Modal
              title="Change cashier's password"
              open={changePasswordModalOpen}
              onOk={handleChangePasswordModalOk}
              confirmLoading={confirmChangePasswordLoading}
              onCancel={handleChangePasswordModalCancel}
            >
              <div className="modal-title "></div>
              <Input className="modal-input" placeholder="New password" />
              <Input className="modal-input" placeholder="Confirm password" />
            </Modal>
            <AdminButton
              style={AdminButtonStyle}
              label={"Change Password"}
              onClick={showChangePasswordModal}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <div className="page-title">Manage Cashiers</div>
      <Table
        className="table"
        columns={cashiersTableColumns}
        dataSource={cashiers}
      ></Table>
    </>
  );
};

const AdminButtonStyle = {
  margin: "0px 8px",
};

export default Cashiers;
