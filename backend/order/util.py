from datetime import datetime


def transform_data_to_model(data):
    date_format = "%d/%m/%Y"
    sender = {
        "sender_first_name": data["Sender"].split()[0],
        "sender_last_name": data["Sender"].split()[-1],
        "sender_country": data["Sender Country Identification"],
        "sender_city": data["Sender City"],
        "sender_state": data["Sender State"],
        "sender_phone": data["Sender Phone"],
        "sender_address": data["Sender Address"],
        "sender_mother_maiden": " ",
        "sender_birth_date": datetime.strptime(data["Birthday Sender"], date_format),
        "sender_mobile_phone": "",
        "sender_account": "",
        "sender_ssn": data["Sender SSN"],
        "id_type": data["Number Id Sender"],
        "sender_state_identification": data["Sender Country Identification"],
        "sender_country_identification": data["Sender Country Identification"],
    }
    receiver = {
        "receiver_last_name": data["Receiver"].split(' ')[-1],
        "receiver_first_name": data["Receiver"].split(' ')[0],
        "receiver_phone": data["Receiver Phone"],
        "receiver_country": "Ethiopia",
        "receiver_city": "ADDIS ABABA GPO",
        "receiver_state": "Ethiopia",
        "receiver_address": data["Receiver Address"],
        "receiver_mother_maiden": "",
        "receiver_birth_date": datetime.strptime(data["Birthday Sender"], date_format),
        "receiver_mobile_phone": "",
        "receiver_account": "",

    }
    payment = {
        "bank_name": data["Bank"],
        "bank_account": data["Bank Account"],
        "point_of_payment": "ehtiopia payee partner",
        "mode_pay_receiver": "BANK DEPOSIT",
    }

    order = {
        "invoice_number": data["Invoice"],
        "confirmation_no": data["Confirmation No"],
        "date": datetime.strptime(data["Date"], "%m/%d/%Y %I:%M:%S %p"),
        "sender_currency": data["Send Currency"],
        "received_currency": data["Received Currency"],
        "rate_change_receiver": data["Rate Change Receiver"],
        "net_amount_receiver": data["Net Amount Receiver"],
        "fee": data["Fee"],
        "payment_type": data["Payment Type"],
        "total_pay_receiver": data["Total Pay Receiver"],
    }

    return sender, receiver, payment, order
