import { Button, Table } from "antd";
import html2pdf from "html2pdf.js";
import "../styles/UserReportLayoutOne.css";

const UserReportLayoutOne = () => {
  const openPDFInNewTab = () => {
    const element = document.getElementById("user-report1-content");
    const pdfWidth = 400;
    const pdfHeight = 1150;

    const opt = {
      margin: 0,
      filename: "Report1.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 7 },
      jsPDF: {
        unit: "mm",
        orientation: "portrait",
        format: [pdfWidth, pdfHeight],
      },
    };

    const pages = [element];
    let doc = html2pdf().set(opt).from(pages[0]).toPdf();
    for (let j = 1; j < pages.length; j++) {
      doc = doc
        .get("pdf")
        .then((pdf) => {
          pdf.addPage();
        })
        .from(pages[j])
        .toContainer()
        .toCanvas()
        .toPdf();
    }

    doc.get("pdf").then(function (pdf) {
      window.open(pdf.output("bloburl"), "_blank");
    });
  };

  const columns = [
    {
      title: "SeqPayee",
      dataIndex: "seq_payee",
      key: "seq_payee",
    },
    {
      title: "SendRef",
      dataIndex: "send_ref",
      key: "send_ref",
    },
    {
      title: "Rec.Country",
      dataIndex: "rec_country",
      key: "rec_country",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Receiving Currency",
      dataIndex: "receiving_currency",
      key: "receiving_currency",
    },
    {
      title: "Received Amount",
      dataIndex: "received_amount",
      key: "received_amount",
    },
    {
      title: "Send Amount",
      dataIndex: "send_amount",
      key: "send_amount",
    },
    {
      title: "Customer Fee",
      dataIndex: "customer_fee",
      key: "customer_fee",
    },
    {
      title: "Send Total",
      dataIndex: "send_total",
      key: "send_total",
    },
    {
      title: "Agent Commission",
      dataIndex: "agent_commission",
      key: "agent_commission",
    },
    {
      title: "Agent Total",
      dataIndex: "agent_total",
      key: "agent_total",
    },
  ];

  const dataSource = [
    {
      seq_payee: "743606213705",
      send_ref: "SE001-124432",
      rec_country: "Ethiopia",
      city: "ADDIS ABABA GPO",
      rate: "116.0000",
      receiving_currency: "ETB",
      received_amount: "16571.42",
      send_amount: "142.66",
      customer_fee: "7.14",
      send_total: "150.00",
      agent_commission: "0.00",
      agent_total: "142.56",
    },
  ];

  for (let i = 0; i < 34; i++) {
    dataSource.push(dataSource[0]);
  }

  return (
    <div
      id="user-report1-content"
      className="user-report1-content user-report-content"
    >
      <div className="ur1-title">User Report</div>
      <div className="ur1-sub-container">
        <span className="ur1-sub-key-1">Date:</span>
        <span className="ur1-sub-val-1">1/9/2024</span>
        <span className="ur1-sub-key-2">To:</span>
        <span className="ur1-sub-val">1/9/2024</span>
      </div>
      <div className="ur1-user">MAREFAT</div>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
      <Button onClick={openPDFInNewTab}>Print</Button>
    </div>
  );
};

export default UserReportLayoutOne;
