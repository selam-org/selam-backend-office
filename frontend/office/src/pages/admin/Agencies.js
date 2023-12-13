import { Table, Space } from "antd";
import { Link } from "react-router-dom";
import PageTitle from "../../components/admin/PageTitle";
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
              <AdminButton style={AdminButtonStyle} label={"Edit"} />
              <Link to={`/admin/agencies/${record.id}`}>
                <AdminButton
                  style={AdminButtonStyle}
                  label={"Rate / Commission"}
                />
              </Link>
              <AdminButton style={AdminButtonStyle} label={"Delete"} />
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
