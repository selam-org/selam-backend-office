import { Row, Image } from "antd";
import FormInput from "../form/FormInput";

const TransactionResult = () => {
  return (
    <>
      <div className="result-title">New Transaction (Search Customer)</div>
      <div className="result-customers"></div>
      <Row className="results-footer">
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
          <FormInput />
        </div>
        /<span className="results-total-pages">0</span>
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
      <div className="footer">
        © Copyrights 2021 - White Wings Technologies-MTS ENTERPRISE - 5.10
      </div>
    </>
  );
};

export default TransactionResult;
