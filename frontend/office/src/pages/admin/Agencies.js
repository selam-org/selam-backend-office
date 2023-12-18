import React, { useState, useEffect } from "react";
import { Table, Space, Modal, Input, Row, Col } from "antd";
import { Link } from "react-router-dom";
import AdminButton from "../../components/admin/AdminButton";
import AddAgencyModal from "../../components/admin/agency/NewAgencyModal";
import { getAgencies, getAgenciesApiCall } from "../../store/agency";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Admin.css";

const { Column } = Table;

const Agencies = () => {
  const dispatch = useDispatch();
  const agencies = useSelector(getAgencies);

  const [editModalOpen, seteditModalOpen] = useState();
  const [confirmEditLoading, setconfirmEditLoading] = useState(false);

  const [activateModalOpen, setactivateModalOpen] = useState();
  const [confirmActivateLoading, setconfirmActivateLoading] = useState(false);

  const showEditModal = () => {
    seteditModalOpen(true);
  };

  const handleEditModalOk = () => {
    setconfirmEditLoading(true);
    setTimeout(() => {
      seteditModalOpen(false);
      setconfirmEditLoading(false);
    }, 2000);
  };

  const handleActivateModalCancel = () => {
    setactivateModalOpen(false);
  };

  const showActivateModal = () => {
    setactivateModalOpen(true);
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

  useEffect(() => {
    dispatch(getAgenciesApiCall());
  }, []);

  console.log(agencies);

  return (
    <>
      <Row justify={"space-between"}>
        <Col>
          <div className="page-title">Manage Agencies</div>
        </Col>
        <Col>
          <AddAgencyModal />
        </Col>
      </Row>
      <Table className="table" dataSource={agencies} rowKey="id">
        <Column title="Name" dataIndex="name" key="title" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <Link to={`/agencies/${record.id}`}>
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
