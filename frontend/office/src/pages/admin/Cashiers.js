import { Table, Space } from "antd";
import AdminButton from "../../components/admin/AdminButton";
import "../styles/Admin.css";

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
          <AdminButton style={AdminButtonStyle} label={"Change password"} />
          <AdminButton style={AdminButtonStyle} label={"Deactivate"} />
          <AdminButton style={AdminButtonStyle} label={"Edit"} />
        </Space>
      );
    },
  },
];

const Cashiers = () => {
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
