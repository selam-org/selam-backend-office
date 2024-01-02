import { useState } from "react";
import { DatePicker, Row } from "antd";
import AdminButton from "../../components/admin/AdminButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getExcelOrderApi,
  getExcelOrder,
  isExcelOrderLoading,
  getExcelOrderError,
} from "../../store/order";
import "../styles/Admin.css";
import "../styles/Report.css";
import * as XLSX from "xlsx";

const { RangePicker } = DatePicker;

const Report = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const dispatch = useDispatch();
  const excelOrder = useSelector(getExcelOrder);
  const loading = useSelector(isExcelOrderLoading);
  const error = useSelector(getExcelOrderError);
  console.log(excelOrder, "excelOrder");
  const isGenerateButtonDisabled = startDate == null || endDate == null;

  const handleDateChange = (dates) => {
    const startDate = dates[0] ? dates[0].format("YYYY-MM-DD") : null;
    const endDate = dates[1] ? dates[1].format("YYYY-MM-DD") : null;
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleGenerate = () => {
    console.log(startDate, endDate);
    dispatch(getExcelOrderApi({ start_date: startDate, end_date: endDate }));
  };

  function convertData(dataList) {
    const convertedDataList = [];

    dataList.forEach((data) => {
      const convertedData = {
        Invoice: data.invoice_number,
        "Confirmation No": data.confirmation_no,
        Agency: data.agency_obj.name,
        Date: new Date(data.date).toLocaleString("en-US", { timeZone: "UTC" }),
        "Send Currency": data.sender_currency,
        "Received Currency": data.received_currency,
        "Rate Change Receiver": parseFloat(data.rate_change_receiver),
        "Net Amount Receiver": parseFloat(data.net_amount_receiver),
        Fee: parseFloat(data.fee),
        Total: parseFloat(data.fee) + parseFloat(data.net_amount_receiver),
        "Payment Type": data.payment_type,
        "Total Pay Receiver": parseFloat(data.total_pay_receiver),
        Sender: `${data.sender_obj.sender_first_name} ${data.sender_obj.sender_last_name}`,
        "Sender Phone": data.sender_obj.sender_phone,
        "Sender Address": data.sender_obj.sender_address,
        "Sender City": data.sender_obj.sender_city,
        "Sender State": data.sender_obj.sender_state,
        "Sender Zip": data.sender_obj.sender_zip,
        "Birthday Sender": new Date(
          data.sender_obj.sender_birth_date
        ).toLocaleDateString(),
        "Sender SSN": data.sender_obj.sender_ssn,
        "Name Type Id Sender": data.sender_obj.id_type,
        "Number Id Sender": data.sender_obj.sender_identification_number,
        "Sender State Identification":
          data.sender_obj.sender_state_identification,
        "Sender Country Identification":
          data.sender_obj.sender_country_identification,
        Receiver: `${data.receiver_obj.receiver_first_name} ${data.receiver_obj.receiver_last_name}`,
        "Receiver Phone": data.receiver_obj.receiver_phone,
        "Receiver Address": data.payment_info_obj.bank_name,
        "Receiver City": data.receiver_obj.receiver_city,
        "Receiver State": data.receiver_obj.receiver_state,
        "Receiver Country": data.receiver_obj.receiver_country,
        "Payee Reference": data.invoice_number,
        "Employee Code": "Marefat",
        "Payee Agency": `${data.agency_obj.name} ${data.payment_info_obj.point_of_payment}`,
        "Point of Payment": data.payment_info_obj.point_of_payment,
        "Mode Pay Receiver": data.payment_info_obj.mode_pay_receiver,
        Bank: data.payment_info_obj.bank_name,
        "Bank Account": data.payment_info_obj.bank_account,
        "Id Sender": data.sender,
        "Notes Receiver": "",
        Company: "Selam Express",
        "ID Branch": data.agency_obj.name,
        "Name Agency": `Agency ${data.agency_obj.name}, ${data.sender_obj.sender_country}`,
        "Address Agency": data.agency_obj.address,
        "City Agency": data.sender_obj.sender_city.split(",")[0],
        "State Agency": data.sender_obj.sender_state,
        Zip_Agency: data.agency_obj.address.split("-")[1],
        "Id Country Transmitter": data.sender_obj.sender_country_identification,
        "Id Country National": data.receiver_obj.receiver_country,
        "Sender Sex": "M", // Assuming sender's gender is male
        Citizenship: data.sender_obj.sender_country,
        "Send Date": new Date(data.date).toLocaleString("en-US", {
          timeZone: "UTC",
        }),
      };

      convertedDataList.push(convertedData);
    });

    return convertedDataList;
  }

  const downloadExcel = (data) => {
    // Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a workbook
    const workbook = XLSX.utils.book_new();

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Convert the workbook to an array buffer
    const excelBuffer = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
    });

    // Create a Blob object
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a URL from the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = url;
    link.download = ".";

    // Append the link to the body
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Cleanup
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="page-title">Report</div>
      <Row className="report-form" align={"middle"}>
        <RangePicker
          onChange={handleDateChange}
          className="admin-date-picker"
        />
        <AdminButton
          loading={loading}
          disabled={loading || isGenerateButtonDisabled}
          label={"Generate"}
          className={"generate-btn"}
          // disabled={isGenerateButtonDisabled}
          onClick={handleGenerate}
        />
      </Row>
      {excelOrder.length > 0 && (
        <a
          // href="https://www.google.com"
          // target="_blank"
          rel="noreferrer"
          className="report-link"
          onClick={() => downloadExcel(convertData(excelOrder))}
        >
          Click here to download the report
        </a>
      )}
    </>
  );
};

export default Report;
