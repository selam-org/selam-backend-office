import React from "react";
import { Space, Table, Tag } from "antd";
const columns = [
  {
    title: "Customer",
    dataIndex: "net_amount_receiver_sum",
    key: "net_amount_receiver_sum",
    width: "25%",
  },
  {
    title: "Agent",
    dataIndex: "net_amount_receiver_sum",
    key: "net_amount_receiver_sum",
    width: "25%",
  },
  {
    title: "Commission",
    dataIndex: "fee_sum",
    key: "fee",
    width: "25%",
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    width: "25%",
  },
];
// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"],
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     tags: ["loser"],
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sydney No. 1 Lake Park",
//     tags: ["cool", "teacher"],
//   },
// ];
const SummaryTable = (props) => {
  const { data } = props;

  return <Table pagination={false} columns={columns} dataSource={[data]} />;
};
export default SummaryTable;
