import React, { useEffect } from "react";
import { Table, Space, Row, Col } from "antd";
import { Link } from "react-router-dom";
import AdminButton from "../../components/admin/AdminButton";
import AddAgencyModal from "../../components/admin/agency/NewAgencyModal";
import { useDispatch, useSelector } from "react-redux";
import EditAgencyModal from "../../components/admin/agency/EditAgencyModal";
import {
  getAgencies,
  getAgenciesApiCall,
  setIsUpdateAgencyModal,
} from "../../store/agency";
import "../styles/Admin.css";
import ActivateAgencyButton from "../../components/admin/agency/ActivateAgencyButton";

const { Column } = Table;

const Agencies = () => {
  const dispatch = useDispatch();
  const agencies = useSelector(getAgencies);

  const showEditModal = (id) => {
    dispatch(
      setIsUpdateAgencyModal({
        id,
        open: true,
      })
    );
  };

  useEffect(() => {
    dispatch(getAgenciesApiCall());
  }, []);

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
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column
          title="Action"
          key="action"
          render={(_, agency) => (
            <Space size="large">
              <Link to={`/agencies/${agency.id}`}>
                <AdminButton label={"Rate / Commission"} />
              </Link>
              <AdminButton
                label={"Edit"}
                onClick={() => {
                  showEditModal(agency.id);
                }}
              />
              <EditAgencyModal id={agency.id} />
              <ActivateAgencyButton />
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default Agencies;
