import React from "react";
import html2pdf from "html2pdf.js";
import { Col, Row } from "antd";
import "../styles/Receipt.css";

const Receipt = ({ receiptContent }) => {
  const openPDFInNewTab = () => {
    const element1 = document.getElementById("receipt-content");

    const pdfWidth = 76;

    const opt = {
      margin: 0,
      filename: "merged-receipts.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 7 },
      jsPDF: {
        unit: "mm",
        orientation: "portrait",
        format: [pdfWidth, 1150],
      },
    };

    const pages = [element1];
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

  return (
    <div>
      <div style={{ display: "nones" }}>
        <div id="receipt-content" className="receipt-content">
          <ReceiptContent receiptTo="Agent" />
          <HorizontalLine className={"page-break"} />
          <ReceiptContent receiptTo="Customer" />
        </div>
      </div>
      <button style={{ margin: 130 }} onClick={openPDFInNewTab}>
        Open PDF in New Tab
      </button>
    </div>
  );
};

const ReceiptContent = ({ receiptTo }) => {
  return (
    <>
      <p className="receipt-title">
        {"SELAM EXPRESS  : 8205 Fenton Street,Silver"}
      </p>
      <p className="receipt-title receipt-title-bottom">
        Spring,MD 20910 | UAN: 1-240 531 2646
      </p>
      <HorizontalLine />
      <img
        src="/images/receipt-logo.png"
        className="receipt-logo"
        width={120}
        alt="receipt-logo"
      />
      <HorizontalLine />
      <p className="receipt-agency-title">Agency Saleemexpress - SE001</p>
      <p className="agency-info">8205 fenton street</p>
      <p className="agency-info agency-location">
        SILVER SPRING Maryland 23233 United States
      </p>
      <div>
        <div className="agency-row">
          <p className="agency-info license">agent License/ :</p>
          <p className="agency-info">ag001</p>
        </div>
        <div className="agency-row">
          <p className="agency-info tel">Tel/ :</p>
          <p className="agency-info">+1 240 531 2646</p>
        </div>
      </div>
      <div className="copy-to">
        <p>{receiptTo} Copy/ :</p>
      </div>

      <div className="key-pair">
        <Row className="key-pair-row" align={"middle"}>
          <Col span={12} className="key-col">
            <p>Date/ :</p>
          </Col>
          <Col span={12} className="pair-col">
            <p>12/16/2023 10:05:36 AM</p>
          </Col>
        </Row>
        <Row className="key-pair-row" align={"middle"}>
          <Col span={12} className="key-col">
            <p>Invoice #/ :</p>
          </Col>
          <Col span={12} className="pair-col">
            <p>SE001-119661</p>
          </Col>
        </Row>
        <Row className="key-pair-row" align={"middle"}>
          <Col span={12} className="key-col">
            <p>Txn Ref No/ : </p>
          </Col>
          <Col span={12} className="pair-col">
            <p>349573570257</p>
          </Col>
        </Row>
      </div>
      <HorizontalLine />
      <div className="key-pair">
        <Row className="key-pair-title">
          <Col span={24} className="pair-col-bold" align="middle">
            <p className="pair-col-bold ">SENDER/ :</p>
          </Col>
        </Row>
        <Row className="key-pair-row" align={"top"}>
          <Col span={10} className="key-col">
            <p>Account #/ :</p>
          </Col>
          <Col span={14} className="pair-col-bold">
            <p>230266</p>
          </Col>
        </Row>
        <Row className="key-pair-row" align={"top"}>
          <Col span={10} className="key-col">
            <p>Name/ :</p>
          </Col>
          <Col span={14} className="pair-col-bold">
            <p>BONIFACE FONKWO</p>
          </Col>
        </Row>
        <Row className="key-pair-row" align={"top"}>
          <Col span={10} className="key-col">
            <p>Telephone/ :</p>
          </Col>
          <Col span={14} className="pair-col-bold">
            <p>2404233510</p>
          </Col>
        </Row>
        <Row className="key-pair-row" align={"top"}>
          <Col span={10} className="key-col">
            <p>Address/ :</p>
          </Col>
          <Col span={14} className="pair-col-bold">
            <p>5515 JAMES RD FORT BELVOIR Virginia United States</p>
          </Col>
        </Row>
        <Row className="key-pair-row" align={"top"}>
          <Col span={13} className="key-col">
            <p>Zip Code/ :</p>
          </Col>
          <Col span={11} className="pair-col-bold">
            <p>22060</p>
          </Col>
        </Row>
      </div>
      <HorizontalLine />
      <div className="key-pair">
        <Row className="key-pair-title">
          <Col span={24} className="pair-col-bold" align="middle">
            <p className="pair-col-bold ">BENEFICIARY/ :</p>
          </Col>
        </Row>
        <Row className="key-pair-row" align={"top"}>
          <Col span={10} className="key-col">
            <p>Account #/ :</p>
          </Col>
          <Col span={14} className="pair-col-bold">
            <p>245730</p>
          </Col>
        </Row>
        <Row className="key-pair-row" align={"top"}>
          <Col span={10} className="key-col">
            <p>Name/ :</p>
          </Col>
          <Col span={14} className="pair-col-bold">
            <p>MESERET KELEMU</p>
          </Col>
        </Row>
        <Row className="key-pair-row" align={"top"}>
          <Col span={10} className="key-col">
            <p>Telephone/ :</p>
          </Col>
          <Col span={14} className="pair-col-bold">
            <p>0923356890</p>
          </Col>
        </Row>
        <Row className="key-pair-row" align={"top"}>
          <Col span={10} className="key-col">
            <p>Address/ :</p>
          </Col>
          <Col span={14} className="pair-col-bold">
            <p>ADDIS ABABA GPO Ethiopia Ethiopia</p>
          </Col>
        </Row>
        <Row className="key-pair-row" align={"top"}>
          <Col span={10} className="key-col">
            <p>Bank/Branch/ :</p>
          </Col>
          <Col span={14} className="pair-col-bold">
            <p>Abay Bank/</p>
          </Col>
        </Row>
        <Row className="key-pair-row" align={"top"}>
          <Col span={10} className="key-col">
            <p>Account/ :</p>
          </Col>
          <Col span={14} className="pair-col-bold">
            <p>1759116081653026--</p>
          </Col>
        </Row>
        <Row className="key-pair-row" align={"top"}>
          <Col span={10} className="key-col">
            <p>Type/ :</p>
          </Col>
          <Col span={14} className="pair-col-bold">
            <p>SAVINGS ACCOUNT</p>
          </Col>
        </Row>
      </div>
      <HorizontalLine />
      <Row className="key-pair-title  amount-title">
        <Col span={24} className="pair-col-bold" align="middle">
          <p className="pair-col-bold ">AMOUNT AND CHARGES/ :</p>
        </Col>
      </Row>
      <div className="receipt-table">
        <div className="row">
          <p className="td td-1 pair-col-bold">Amount/ :</p>
          <p className="td td-2 pair-col">USD 247.62</p>
        </div>
        <div className="row">
          <p className="td td-1 pair-col">Rate/ :</p>
          <p className="td td-2 pair-col">ETB 115.0000</p>
        </div>
        <div className="row">
          <p className="td td-1 pair-col">Fee :</p>
          <p className="td td-2 pair-col">USD 12.38</p>
        </div>
        <div className="row">
          <p className="td td-1 pair-col">Handling/ :</p>
          <p className="td td-2 pair-col">0.00</p>
        </div>
        <div className="row">
          <p className="td td-1 pair-col-bold">Total Charges/ :</p>
          <p className="td td-2 pair-col">USD 12.38</p>
        </div>
        <div className="row ">
          <p className="td td-1 pair-col-bold reward-row">Reward Amount/ :</p>
          <p className="td td-2 pair-col">USD 0.00</p>
        </div>
        <div className="row">
          <p className="td td-1 pair-col-bold">Total Tax/ :</p>
          <p className="td td-2 pair-col">USD 0.00</p>
        </div>
        <div className="row">
          <p className="td td-1 pair-col-bold">Total/ :</p>
          <p className="td td-2 pair-col">USD 260</p>
        </div>
      </div>
      <Row className="key-pair-title">
        <Col span={24} className="pair-col-bold" align="middle">
          <p className="pair-col-bold ">Payee/ :</p>
        </Col>
      </Row>
      <Row className="key-pair-row" align={"middle"}>
        <Col span={10} className="key-col">
          <p>Confirmation</p>
          <p> No./ :</p>
        </Col>
        <Col span={14}>
          <span className="confirmation-no-value">349573570257</span>
        </Col>
      </Row>
      <Row className="key-pair-row" align={"top"}>
        <Col span={10} className="key-col">
          <p>Delivery Type :</p>
        </Col>
        <Col span={14} className="pair-col-bold">
          <p>BANK DEPOSIT</p>
        </Col>
      </Row>
      <Row className="key-pair-row" align={"top"}>
        <Col span={14} className="key-col">
          <p>Will Pay/ :</p>
        </Col>
        <Col span={8} className="pair-col-bold">
          <p>ETB 28476.19</p>
        </Col>
      </Row>
      <Row className="key-pair-row" align={"top"}>
        <Col span={10} className="key-col">
          <p>Message :</p>
        </Col>
      </Row>
      <HorizontalLine />
      <Row className="key-pair-title">
        <Col span={24} align="middle">
          <p className="pair-col-bold">
            Important Notices/ : Conditions of Services/
          </p>
        </Col>
      </Row>
      <p className="pair-col-bold" style={{ marginTop: -7 }}>
        :
      </p>

      <div className="receipt-info">
        <p>
          RIGHT TO REFUND:-You the customer can cancel your transaction for full
          refund within 30 minutes after you place your transaction unless the
          fund picked up or deposited. If your order was placed more than 30
          minutes prior to your requesting a refund, you are entitled to a
          refund of all money received for transmittal within ten (10) days of
          receipt of a written request for refund unless any of the following
          occurs :(a)The money have been transmitted and delivered to the
          recipient prior to receipt of the written request for a refund;(b)
          Instruction have been given committing an equivalent amount of money
          the person designated by the customer prior to receipt of a written
          request for a refund; (c)The company and/or its authorized delegate
          has reason to believe that a crime has occurred, is occurring or may
          potentially occur as a result of transmitting the money as requested
          by the customer or refunding the money as requested by the customer,
          or (d) The company is the otherwise barred by the law from making a
          refund. TRANSACTION TO ACCOUNTS:-Please make sure the account number,
          Bank details, and mobile number are correct before sending. Otherwise,
          Money will be sent to the wrong account and the company is not
          responsible. The company makes money from currency exchange, when you
          choosing a money transmitter carefully compare both transfer fee and
          exchange rates. The transfer may take three to five days.
          <span className="receip-info-capital">
            CONSUMER FRAUD ALERT:-NEVER SEND MONEY TO SOMEONE YOU DON`T REALLY
            KNOW.
          </span>
        </p>
        <p className="red-info">
          BEWARE - Never send money to someone you don't really know!/ :
        </p>
        <p className="sign-info">
          By signing this form, you agree to the terms and conditions of the
          service./ :
        </p>
        <HorizontalLine />
        <Row className="key-pair-title">
          <Col span={24} align="middle">
            <p className="send-signature">sender signature/ :</p>
          </Col>
        </Row>
        <HorizontalLine />
        <Row className="key-pair-title">
          <Col span={24} align="middle">
            <p>Cashier Signature</p>
          </Col>
        </Row>
      </div>
    </>
  );
};

const HorizontalLine = ({ className }) => {
  return <div className={`horizontal-line ${className}`}></div>;
};

export default Receipt;
