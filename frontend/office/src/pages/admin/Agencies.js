import React, { useState } from "react";
import { Table, Space, Modal, Input } from "antd";
import { Link } from "react-router-dom";
import AdminButton from "../../components/admin/AdminButton";
import "../styles/Admin.css";

const { Column } = Table;

const agencies = [
  { id: 1, title: "Silver Spring" },
  { id: 2, title: "Washington DC" },
  { id: 3, title: "Maryland" },
  { id: 4, title: "Los Angeles" },
];

const Agencies = () => {
  const [editModalOpen, seteditModalOpen] = useState();
  const [confirmEditLoading, setconfirmEditLoading] = useState(false);

  const [activateModalOpen, setactivateModalOpen] = useState();
  const [confirmActivateLoading, setconfirmActivateLoading] = useState(false);

  const showEditModal = () => {
    seteditModalOpen(true);
  };

  const showActivateModal = () => {
    setactivateModalOpen(true);
  };

  const handleEditModalOk = () => {
    setconfirmEditLoading(true);
    setTimeout(() => {
      seteditModalOpen(false);
      setconfirmEditLoading(false);
    }, 2000);
  };

  const handleActivateModalOk = () => {
    setconfirmActivateLoading(true);
    setTimeout(() => {
      setactivateModalOpen(false);
      setconfirmActivateLoading(false);
    }, 2000);
  };

  const handleEditModalCancel = () => {
    seteditModalOpen(false);
  };

  const handleActivateModalCancel = () => {
    setactivateModalOpen(false);
  };

  return (
    <>
      <div className="page-title">Manage Agencies</div>
      <Table className="table" dataSource={agencies}>
        <Column title="Title" dataIndex="title" key="title" />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <Link to={`/admin/agencies/${record.id}`}>
                <AdminButton
                  style={AdminButtonStyle}
                  label={"Rate / Commission"}
                />
              </Link>
              <AdminButton
                style={AdminButtonStyle}
                label={"Edit"}
                onClick={showEditModal}
              />
              <Modal
                title="Edit agency name"
                open={editModalOpen}
                onOk={handleEditModalOk}
                confirmLoading={confirmEditLoading}
                onCancel={handleEditModalCancel}
              >
                <div className="modal-title "></div>
                <Input />
              </Modal>
              <AdminButton
                style={AdminButtonStyle}
                label={"Activate"}
                onClick={showActivateModal}
              />
              <Modal
                title="Are you sure you want to activate the agency?"
                open={activateModalOpen}
                onOk={handleActivateModalOk}
                confirmLoading={confirmActivateLoading}
                onCancel={handleActivateModalCancel}
                okText="Yes"
              >
                <div className="modal-title "></div>
              </Modal>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

const AdminButtonStyle = {
  margin: "0px 12px",
};

export default Agencies;
