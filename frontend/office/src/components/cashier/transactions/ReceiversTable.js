import { Table } from "antd";
import { Link } from "react-router-dom";
import { setReceiver } from "../../../store/transactions";
import { useDispatch } from "react-redux";
import "../styles/ReceiversTable.css";

const ReceiversTable = ({ clients, orderId }) => {
  const dispatch = useDispatch();

  const handleReceiverClick = (client) => {
    dispatch(setReceiver(client));
  };

  const clientColumns = [
    {
      title: "FIRST NAME",
      dataIndex: "receiver_first_name",
      key: "receiver_first_name",
      render: (text, client, index) => {
        return (
          <Link
            to={`/orders/${orderId}`}
            className="sender-account"
            onClick={() => handleReceiverClick(client)}
          >
            {text}
          </Link>
        );
      },
    },
    {
      title: "MIDDLE NAME",
      dataIndex: "receiver_middle_name",
      key: "receiver_middle_name",
    },
    {
      title: "LAST NAME",
      dataIndex: "receiver_last_name",
      key: "receiver_last_name",
    },
    {
      title: "MOTHER'S MAIDEN NAME",
      dataIndex: "receiver_mother_maiden",
      key: "receiver_mother_maiden",
    },
    {
      title: "TELEPHONE",
      dataIndex: "receiver_phone",
      key: "receiver_phone",
    },
    {
      title: "ADDRESS",
      dataIndex: "receiver_address",
      key: "receiver_address",
      className: "centered-column",
      render: (text) => text || ", ADDIS ABABA GPO Ethiopia, Ethiopia",
    },
    {
      title: "TRANSACTION DATE",
      dataIndex: "transaction_date",
      key: "transaction_date",
      render: (text) => text || "Jan 01 2024 7:00AM",
    },
    {
      title: "ACCOUNT#",
      dataIndex: "receiver_account",
      key: "receiver_account",
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      render: (text) => text || "0.00",
    },
  ];

  return (
    <Table
      dataSource={clients}
      columns={clientColumns}
      pagination={false}
      size="small"
      className="receivers-table"
    />
  );
};

export default ReceiversTable;
