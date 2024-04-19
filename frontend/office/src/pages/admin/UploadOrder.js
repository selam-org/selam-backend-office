// import AgencyTitle from "../../components/admin/commission/AgencyTitle";
// import RateForm from "../../components/admin/commission/RateForm";
// import NewCommissionForm from "../../components/admin/commission/NewCommissionForm";
// import CommissionForm from "../../components/admin/commission/CommissionForm";
import { useSelector, useDispatch } from "react-redux";
import { getAgency } from "../../store/agency";
import { useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, FloatButton } from "antd";
import * as XLSX from "xlsx";
import order, { setOrders, getOrder } from "../../store/order";
import OrdersTable from "../../components/admin/uploadOrder/OrderTable";
import { useState } from "react";
import "../styles/UploadOrder.css";
import {
  uploadOrderApi,
  getIsUploadingOrder,
  getUploadOrderError,
} from "../../store/order";
const UploadOrder = () => {
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();
  const orders = useSelector(getOrder);
  const loading = useSelector(getIsUploadingOrder);
  const error = useSelector(getUploadOrderError);
  console.log(error, "error");
  // console.log(orders, "orders");
  const props = {
    accept:
      "application/vnd.ms-excel , application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    name: "file",
    multiple: false,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      const isXls =
        file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      console.log(isXls, "isXls");
      setFileList([file]);
      readExcelFileData(file);
      return false;
    },
    fileList,
  };

  const readExcelFileData = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((order) => {
      console.log(order, "order");
      dispatch(setOrders(order));
      console.log(orders, "getOrder");
    });
  };
  return (
    <div className="upload-container">
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <OrdersTable />
      {console.log(orders, "orders2")}
      {2 > 0 ? (
        <Button
          loading={loading}
          disabled={loading}
          icon={<UploadOutlined> Upload</UploadOutlined>}
          onClick={() => {
            if (orders.length > 0) {
              dispatch(uploadOrderApi(orders));
              dispatch(setOrders([]));
            }
          }}
        >
          {" "}
          Upload Orders
        </Button>
      ) : null}
    </div>
  );
};

export default UploadOrder;
