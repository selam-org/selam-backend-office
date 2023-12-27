import { Row, Col, Table } from "antd";
import FormInput from "../form/FormInput";
import FormDropdown from "../form/FormDropdown";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../../../store/transactions";
import { Link } from "react-router-dom";

const TransactionResult = () => {
  const sender = useSelector(getTransactions);
  const pageSizeOptions = [
    {
      title: "10",
      value: 10,
    },
  ];

  return (
    <div className="senders-results">
      <div className="result-customers">
        <div className="results-section">
          <div className="result-title">New Transaction (Search Customer)</div>
          <Table
            className="results-table"
            dataSource={sender}
            pagination={false}
            columns={[
              {
                title: "Account #",
                dataIndex: "sender_account",
                key: "sender_account",
                render: (_, item, index) => (
                  <Link
                    className="sender-account"
                    key={item.id}
                    to={`/orders/${item.id}`}
                  >
                    <li>{item.sender_account}</li>
                  </Link>
                ),
              },
              {
                title: "FIRST NAME",
                dataIndex: "sender_first_name",
                key: "sender_first_name",
              },
              {
                title: "MIDDLE NAME",
                dataIndex: "sender_middle_name",
                key: "sender_middle_name",
              },
              {
                title: "LAST NAME",
                dataIndex: "sender_last_name",
                key: "sender_last_name",
              },
              {
                title: "MOTHER'S MAIDEN NAME",
                dataIndex: "sender_mother_maiden",
                key: "sender_mother_maiden",
              },
              {
                title: "TELEPHONE",
                dataIndex: "sender_phone",
                key: "sender_phone",
              },
              {
                title: "ADDRESS",
                dataIndex: "sender_address",
                key: "sender_address",
              },
              {
                title: "TYPE",
                dataIndex: "",
                key: "",
              },
              {
                title: "Mobile Phone",
                dataIndex: "sender_mobile_phone",
                key: "sender_mobile_phone",
              },
              {
                title: "Country",
                dataIndex: "sender_country",
                key: "sender_country",
              },
              {
                title: "State",
                dataIndex: "sender_state",
                key: "sender_state",
              },
              {
                title: "Zip",
                dataIndex: "sender_zip",
                key: "sender_zip",
              },
              {
                title: "Birth date",
                dataIndex: "sender_birth_date",
                key: "sender_birth_date",
              },
            ]}
          />
        </div>
      </div>

      <Row className="results-footer">
        <Col span={8}>
          <Row align="middle">
            <span className="app-text" style={{ marginRight: 12 }}>
              First Page
            </span>
            <img
              className="page-arrow"
              src="/images/left-arrow.svg"
              width={20}
              alt="left-arrow"
            />
            <div className="results-page-input">
              <FormInput defaultValue={0} />
            </div>
            /<span className="results-total-pages">1</span>
            <img
              className="page-arrow"
              src="/images/right-arrow.svg"
              width={20}
              alt="left-arrow"
            />
            <span className="app-text" style={{ marginLeft: 12 }}>
              Last Page
            </span>
          </Row>
        </Col>
        <Col>Total Records: {sender.length}</Col>
        <Col className="results-page-dropdown" span={14} align="right">
          <FormDropdown options={pageSizeOptions} defaultValue={10} />
        </Col>
      </Row>
      <div className="footer">
        © Copyrights 2021 - White Wings Technologies-MTS ENTERPRISE - 5.10
      </div>
    </div>
  );
};

export default TransactionResult;
