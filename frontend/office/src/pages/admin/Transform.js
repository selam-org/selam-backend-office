function convertData(data) {
  const convertedData = {
    Invoice: data.invoice_number,
    "Confirmation No": data.confirmation_no.toString(),
    Agency: data.agency_obj.name,
    Date: new Date(data.date).toLocaleString("en-US", { timeZone: "UTC" }),
    "Send Currency": data.sender_currency,
    "Received Currency": data.received_currency,
    "Rate Change Receiver": parseFloat(data.rate_change_receiver),
    "Net Amount Receiver": parseFloat(data.net_amount_receiver),
    Fee: parseFloat(data.fee),
    Total: parseFloat(data.total_pay_receiver),
    "Payment Type":
      data.payment_type.charAt(0).toUpperCase() + data.payment_type.slice(1),
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
    "Sender State Identification": data.sender_obj.sender_state_identification,
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

  return convertedData;
}
