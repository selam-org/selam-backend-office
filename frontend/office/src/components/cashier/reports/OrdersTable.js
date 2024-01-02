import { Table } from "antd";
import "../styles/OrdersTable.css";

const OrdersTable = () => {
  const columns = [
    {
      title: "",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "REF.",
      dataIndex: "ref",
      key: "ref",
    },
    {
      title: "DESCRIPTION",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "CURRENCY",
      dataIndex: "currency",
      key: "currency",
    },
    {
      title: "Transaction Type",
      dataIndex: "transaction_type",
      key: "transaction_type",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Debits",
      dataIndex: "debits",
      key: "debits",
    },
    {
      title: "Credits",
      dataIndex: "credits",
      key: "credits",
    },
    {
      title: "BALANCE",
      dataIndex: "balance",
      key: "balance",
      render: (text, record, index) => <span>{text}</span>,
    },
  ];

  const sampleRow = {
    index: 1,
    date: "1/1/2024 6:32 PM",
    ref: "SE001-122886 / SE001-122886",
    description: "Ag. Invoice (outbound) unpaid",
    currency: "USD",
    transaction_type: "Cash",
    amount: "105.00",
    debits: "105.00",
    balance: "119,140,251.28",
  };
  let dataSource = [];

  for (let i = 0; i < 20; i++) {
    dataSource = [...dataSource, { ...sampleRow, index: i + 1 }];
  }

  // Add last row of total.
  dataSource = [...dataSource, { debits: "8,703.00", credits: "0.00" }];

  const getRowClassName = (record, index) => {
    if (index === dataSource.length - 1) {
      return "last-row-total";
    }
    return "";
  };

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      className="orders-table"
      rowClassName={getRowClassName}
      pagination={false}
    />
  );
};

export default OrdersTable;
