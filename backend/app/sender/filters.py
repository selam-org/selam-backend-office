import django_filters
from django.db.models import Q


class OrderFilter(django_filters.FilterSet):
    sender_phone = django_filters.CharFilter(lookup_expr='iexact')
    sender_account = django_filters.CharFilter(lookup_expr='iexact')
    sender_first_name = django_filters.CharFilter(lookup_expr='iexact')
    sender_last_name = django_filters.CharFilter(lookup_expr='iexact')
    sender_mother_maiden = django_filters.CharFilter(lookup_expr='iexact')
