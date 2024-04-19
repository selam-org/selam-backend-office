import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "office.settings")
django.setup()

import json
from datetime import datetime
from sender.models import Sender
from receiver.models import Receiver
from payment_info.models import PaymentInfo
from order.models import Order
from order.util import transform_data_to_model
from pathlib import Path

ROOT_DIR = Path(__file__).parent
JSON_PATH = ROOT_DIR / "order.json"

# print(f"BASE_DIR: {ROOT_DIR}")
# print(f"JSON_PATH: {JSON_PATH}")
# print(f"Does the file exist? {os.path.exists(JSON_PATH)}")


def get_receiver_full_name(receiver):
    if isinstance(receiver, Receiver):
        return f"{receiver.receiver_first_name} + {receiver.receiver_last_name}"
    return f"{receiver['receiver_first_name']} + {receiver['receiver_last_name']}"


def get_payment_info_identifier(payment_info):
    if isinstance(payment_info, PaymentInfo):
        return f"{payment_info.bank_name} + {payment_info.bank_account}"
    return f"{payment_info['bank_name']} + {payment_info['bank_account']}"


def populate_database():
    with open(JSON_PATH, "r") as file:
        data = json.load(file)

    sender_objects = []
    sender_phones = set()
    for item in data:
        sender, receiver, payment_info, order = transform_data_to_model(item)
        sender_obj = Sender(**sender)
        if sender_obj.sender_phone not in sender_phones:
            sender_phones.add(sender_obj.sender_phone)
            sender_objects.append(sender_obj)

    # Key: Sender phone.
    # Value: Database stored sender object.
    sender_map = {}
    Sender.objects.bulk_create(sender_objects)
    sender_bulk_objects = Sender.objects.all()

    for sender_obj in sender_bulk_objects:
        sender_map[sender_obj.sender_phone] = sender_obj
    print("Sender objects created!")

    receiver_objects = []
    receover_names = set()
    for item in data:
        sender, receiver, payment_info, order = transform_data_to_model(item)
        receiver["sender"] = sender_map[sender_obj.sender_phone]
        receiver_full_name = get_receiver_full_name(receiver)
        if receiver_full_name not in receover_names:
            receiver_obj = Receiver(**receiver)
            receover_names.add(receiver_full_name)
            receiver_objects.append(receiver_obj)

    # Key: Receiver full name.
    # Value: Database stored receiver object.
    receiver_map = {}
    Receiver.objects.bulk_create(receiver_objects)
    receiver_bulk_objects = Receiver.objects.all()

    for receiver_obj in receiver_bulk_objects:
        receiver_map[get_receiver_full_name(receiver_obj)] = receiver_obj
    print("Receiver objects created!")

    payment_info_objects = []
    payment_info_identifiers = set()
    for item in data:
        sender, receiver, payment_info, order = transform_data_to_model(item)
        payment_info["receiver"] = receiver_map[get_receiver_full_name(receiver_obj)]
        payment_info_identifier = get_payment_info_identifier(payment_info)
        if payment_info_identifier not in payment_info_identifiers:
            payment_info_obj = PaymentInfo(**payment_info)
            payment_info_identifiers.add(payment_info_identifier)
            payment_info_objects.append(payment_info_obj)

    # Key: Payment info identifier.
    # Value: Database stored payment info object.
    payment_info_map = {}
    PaymentInfo.objects.bulk_create(payment_info_objects)
    payment_info_bulk_objects = PaymentInfo.objects.all()

    for payment_info_obj in payment_info_bulk_objects:
        payment_info_map[
            get_payment_info_identifier(payment_info_obj)
        ] = payment_info_obj
    print("Payment info objects created!")

    order_objects = []
    for index, item in enumerate(data):
        sender, receiver, payment_info, order = transform_data_to_model(item)
        order["confirmation_no"] = index
        order["invoice_no"] = index
        order["sender"] = sender_map[sender_obj.sender_phone]
        order["receiver"] = receiver_map[get_receiver_full_name(receiver_obj)]
        order["payment_info"] = payment_info_map[
            get_payment_info_identifier(payment_info_obj)
        ]
        order_obj = Order(**order)
        order_objects.append(order_obj)

    Order.objects.bulk_create(order_objects)
    print("Orders created!")


if __name__ == "__main__":
    populate_database()
