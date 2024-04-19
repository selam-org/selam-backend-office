import React, { useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrder, getFilters, updateOrder } from "../../../store/order";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const OrdersTable = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getOrder);
  const filters = useSelector(getFilters);
  console.log(orders, "orders", filters, "filters");
  const [form] = Form.useForm();
  //   const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    console.log(record, "record");
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [];
      console.log(row, key, "row");
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        console.log(index, "index", row, "rowindex");
        dispatch(
          updateOrder({
            index,
            row,
          })
        );
        setEditingKey("");
      }
      // setData(newData);
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns = [
    {
      title: "Sender Phone",
      dataIndex: "Sender Phone",
      width: "25%",
      //   editable: true,
      filters: filters,
      //   filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record["Sender Phone"].startsWith(value),
    },
    {
      title: "Receiver",
      dataIndex: "Receiver",
      width: "15%",
      editable: true,
    },
    {
      title: "Total Pay Receiver",
      dataIndex: "Total Pay Receiver",
      width: "20%",
      editable: true,
    },
    {
      title: "Bank Account",
      dataIndex: "Bank Account",
      width: "20%",
      editable: true,
    },
    {
      title: "Date",
      dataIndex: "Date",
      
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={orders}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
export default OrdersTable;
